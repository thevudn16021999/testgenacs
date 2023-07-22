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

import m, { ClosureComponent, Component } from 'mithril';
import menu from './menu';
import drawerComponent from './drawer-component';
import userMenu from './user-menu';
import adminMenu from './admin-menu';
import * as overlay from './overlay';
import { version as VERSION } from '../package.json';
import datalist from './datalist';

const adminPages = [
  'presets',
  'provisions',
  'virtualParameters',
  'files',
  'config',
  'users',
  'permissions',
];

const navigationPreventionIfDisplayedInIframe = (): void => {
  const iFrameDetection = window !== window.parent;
  if (!iFrameDetection) return;
  const elements = document.querySelectorAll('.overview-chart-group a');
  console.log('navigationPreventionIfDisplayedInIframe', elements);
  if (!elements.length) return;

  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function (e) {
      e.preventDefault();
      window.parent.postMessage(e.target.parentNode.attributes.href.value, '*');
    });
  }
};

const hideHeaderIfDisplayedInIframe = (): void => {
  const iFrameDetection = window !== window.parent;
  if (!iFrameDetection) return;
  window.parent.postMessage(window.location.href, '*');
  console.log('in iframe...........');
  const headerEl = document.querySelector('#header');
  if (!headerEl) return;

  (headerEl as any).style.display = 'none';
};

const logoutIfDefine = (): void => {
  const decodedUrl = decodeURIComponent(location.href);
  const processLogout = decodedUrl.includes('logout');
  if (!processLogout) return;
  console.log('logout...........');
  const logoutBtn = document.querySelector('#header .user-menu button');
  if (!logoutBtn) return;
  (logoutBtn as any).click();
  setTimeout(() => {
    window.close();
  }, 3000);
};

const component: ClosureComponent = (): Component => {
  return {
    view: (vnode) => {
      navigationPreventionIfDisplayedInIframe();
      hideHeaderIfDisplayedInIframe();
      logoutIfDefine();
      let sideMenu, group;

      if (adminPages.includes(vnode.attrs['page'])) {
        group = 'admin';
        const attrs = {};
        attrs['page'] = vnode.attrs['page'];
        sideMenu = m(adminMenu, attrs);
      }

      const attrs = {};
      attrs['page'] = group || vnode.attrs['page'];

      return [
        m('#header', [
          m(
            'div.logo',
            m('img', { src: 'logo.svg' }),
            m('span.version', 'v' + VERSION)
          ),
          m(userMenu),
          m(menu, attrs),
          m(drawerComponent),
        ]),
        m(
          '#content-wrapper',
          sideMenu,
          m('#content', { class: `page-${vnode.attrs['page']}` }, [
            vnode.children,
          ])
        ),
        overlay.render(),
        m(datalist),
      ];
    },
  };
};

export default component;
