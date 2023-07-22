/**
 * Copyright 2013-2019  GenieACS Inc.
 *
 * This file is part of GenieACS.
 *
 * GenieACS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * GenieACS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with GenieACS.  If not, see <http://www.gnu.org/licenses/>.
 */

import { spawn, ChildProcess } from "child_process";
import * as crypto from "crypto";
import * as config from "./config";
import { Fault } from "./types";
import { ROOT_DIR } from "./config";
import * as logger from "./logger";
import readline from "readline";

const TIMEOUT = +config.get("EXT_TIMEOUT");

const processes: { [script: string]: ChildProcess } = {};
const jobs = new Map();

export function run(args: string[]): Promise<{ fault: Fault; value: any }> {
  return new Promise((resolve) => {
    const scriptName = args[0];

    const id = crypto.randomBytes(8).toString("hex");
    jobs.set(id, resolve);

    if (!processes[scriptName]) {
      const p = spawn(ROOT_DIR + "/bin/genieacs-ext", [scriptName], {
        stdio: ["ignore", "pipe", "pipe", "ipc"],
      });
      processes[scriptName] = p;

      p.on("error", (err) => {
        if (processes[scriptName] === p) {
          if (jobs.delete(id)) {
            resolve({
              fault: { code: err.name, message: err.message },
              value: null,
            });
          }

          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          kill(processes[scriptName]);
          delete processes[scriptName];
        }
      });

      p.on("disconnect", () => {
        if (processes[scriptName] === p) delete processes[scriptName];
      });

      p.on("message", (message) => {
        const func = jobs.get(message[0]);
        if (func) {
          jobs.delete(message[0]);
          // Wait for any disconnect even to fire
          setTimeout(() => {
            func({ fault: message[1], value: message[2] });
          });
        }
      });

      const rlstdout = readline.createInterface(p.stdout);
      rlstdout.on("line", (line) => {
        logger.info({ message: `Ext ${scriptName}(${p.pid}): ${line}` });
      });

      const rlstderr = readline.createInterface(p.stderr);
      rlstderr.on("line", (line) => {
        logger.warn({ message: `Ext ${scriptName}(${p.pid}): ${line}` });
      });
    }

    setTimeout(() => {
      if (jobs.delete(id)) {
        resolve({
          fault: { code: "timeout", message: "Extension timed out" },
          value: null,
        });
      }
    }, TIMEOUT);

    if (!processes[scriptName].connected) return false;

    return processes[scriptName].send([id, args.slice(1)]);
  });
}

function kill(process: ChildProcess): Promise<void> {
  return new Promise((resolve) => {
    const timeToKill = Date.now() + 5000;

    process.kill();

    const t = setInterval(() => {
      if (!process.connected) {
        clearInterval(t);
        resolve();
      } else if (Date.now() > timeToKill) {
        process.kill("SIGKILL");
        clearInterval(t);
        resolve();
      }
    }, 100);
  });
}

export async function killAll(): Promise<void> {
  await Promise.all(
    Object.entries(processes).map(([k, p]) => {
      delete processes[k];
      return kill(p);
    })
  );
}
