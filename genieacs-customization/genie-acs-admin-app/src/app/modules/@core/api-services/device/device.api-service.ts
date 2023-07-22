import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiService } from 'src/app/modules/@core/api-services/base.api-service';
import { FilePushingRequest } from 'src/app/modules/@core/api-services/device/request-models/file-pushing.request';
import { GettingDeviceTaskRequest } from 'src/app/modules/@core/api-services/device/request-models/getting-device-task.request';
import { SettingDeviceTaskRequest } from 'src/app/modules/@core/api-services/device/request-models/setting-device-task.request';
import { TagRequest } from 'src/app/modules/@core/api-services/device/request-models/tag.request';
import { TaskRequest } from 'src/app/modules/@core/api-services/device/request-models/task.request';
import { DeviceSummaryResponse } from 'src/app/modules/@core/api-services/device/response-models/device-summary.response';
import { DeviceTaskResponse } from 'src/app/modules/@core/api-services/device/response-models/device-task.response';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';
import { SortByFieldRequest } from 'src/app/modules/@core/api-services/share-models/sort-by-field.request';

@Injectable({
    providedIn: 'root',
})
export class DeviceApiService extends BaseApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    get$(
        page: number,
        take: number,
        filter: string,
        sorts: SortByFieldRequest[] = [],
        projectionFields: string[] = []
    ): Observable<PaginationResponse<DeviceSummaryResponse>> {
        const skip = page * take;
        let params = this.gethHttpParamBuilder()
            .append('limit', take)
            .append('skip', skip)
            .append('filter', filter || 'true');

        if (projectionFields && projectionFields.length) {
            projectionFields.forEach(
                (f) => (params = params.append('projection', f))
            );
        }

        if (sorts && sorts.length) {
            const sort = sorts
                .map((s) => `"${s.fieldName}":${s.direction}`)
                .join(',');
            params = params.append('sort', `{${sort}}`);
        }

        return this.http
            .get<any>(`${this.baseUrl}/api/devices`, {
                params,
                observe: 'response',
            })
            .pipe(
                map((resp) => {
                    const items = resp.body as DeviceSummaryResponse[];
                    const total = +(resp.headers.get('X-Total-Count') || 0);
                    return PaginationResponseBuilder({
                        Total: total,
                        Count: items.length,
                        Items: items,
                        Offset: skip,
                        Limit: take,
                    }) as PaginationResponse<DeviceSummaryResponse>;
                })
            );
    }

    getById$(deviceId: string): Observable<DeviceSummaryResponse> {
        const query = `DeviceID.ID = "${deviceId}"`;
        const params = this.gethHttpParamBuilder().append('filter', query);

        return this.http
            .get<DeviceSummaryResponse[]>(
                `${this.baseUrl}/api/devices/?filter=${encodeURIComponent(
                    query
                )}`
            )
            .pipe(
                map((deviceDetails) => {
                    return deviceDetails.length > 0
                        ? deviceDetails[0]
                        : (null as any);
                })
            );
    }

    getByPPPoEACName$(
        pppoEACName: string,
        projectionFields: string[] = []
    ): Observable<DeviceSummaryResponse> {
        let params = this.gethHttpParamBuilder()
            .append('limit', 1)
            .append('skip', 0)
            .append(
                'filter',
                `LOWER(VirtualParameters.PPPoEACName) LIKE "${pppoEACName
                    .trim()
                    .toLocaleLowerCase()}"`
            );

        if (projectionFields && projectionFields.length) {
            projectionFields.forEach(
                (f) => (params = params.append('projection', f))
            );
        }

        return this.http
            .get<any>(`${this.baseUrl}/api/devices`, {
                params,
                observe: 'response',
            })
            .pipe(
                map((resp) => {
                    const items = resp.body as DeviceSummaryResponse[];
                    return items.length ? items[0] : (undefined as any);
                })
            );
    }

    getByPPPoEACNames$(
        pppoEACNames: string[],
        projectionFields: string[] = []
    ): Observable<DeviceSummaryResponse[]> {
        let params = this.gethHttpParamBuilder()
            .append('limit', 200)
            .append('skip', 0)
            .append(
                'filter',
                pppoEACNames
                    .map(
                        (n) =>
                            `LOWER(VirtualParameters.PPPoEACName) LIKE "${n
                                .trim()
                                .toLocaleLowerCase()}"`
                    )
                    .join(' OR ')
            );

        if (projectionFields && projectionFields.length) {
            projectionFields.forEach(
                (f) => (params = params.append('projection', f))
            );
        }

        return this.http.get<DeviceSummaryResponse[]>(
            `${this.baseUrl}/api/devices`,
            {
                params,
            }
        );
    }

    createTasks$(
        deviceId: string,
        taskRequests: SettingDeviceTaskRequest[] | GettingDeviceTaskRequest[]
    ): Observable<DeviceTaskResponse[]> {
        return this.http.post<DeviceTaskResponse[]>(
            `${this.baseUrl}/api/devices/${encodeURIComponent(
                deviceId
            )}/tasks?connection_request`,
            taskRequests
        );
    }

    createSingleTask$(
        taskRequest:
            | SettingDeviceTaskRequest
            | GettingDeviceTaskRequest
            | FilePushingRequest
            | TaskRequest
    ): Observable<DeviceTaskResponse> {
        return this.http
            .post<DeviceTaskResponse[]>(
                `${this.baseUrl}/api/devices/${encodeURIComponent(
                    taskRequest.device
                )}/tasks?connection_request`,
                [taskRequest]
            )
            .pipe(
                map((results) => {
                    return (results || [])[0] || ({} as any);
                })
            );
    }

    getTasksByIds$(taskIds: string[]) {
        // _id < '3460F9-IGD-22260H2000313:zzzz';
        const query = taskIds.map((t) => `_id = "${t}"`).join(' OR ');
        return this.http.get<DeviceTaskResponse[]>(
            `${this.baseUrl}/api/tasks//?filter=${encodeURIComponent(query)}`
        );
    }

    upsertTag$(tagReq: TagRequest) {
        return this.http.post<any>(
            `${this.baseUrl}/api/devices/${encodeURIComponent(
                tagReq.device
            )}/tags`,
            {
                [tagReq.tagVal]: true,
            }
        );
    }

    deleteTag$(tagReq: TagRequest) {
        return this.http.post<any>(
            `${this.baseUrl}/api/devices/${encodeURIComponent(
                tagReq.device
            )}/tags`,
            {
                [tagReq.tagVal]: false,
            }
        );
    }

    createFileTask$(fileTaskReq: FilePushingRequest) {
        return this.http.post<DeviceTaskResponse[]>(
            `${this.baseUrl}/api/devices/${encodeURIComponent(
                fileTaskReq.device
            )}/tasks`,
            [fileTaskReq]
        );
    }

    deleteDevice$(deviceId: string) {
        return this.http.delete<any>(
            `${this.baseUrl}/api/devices/${encodeURIComponent(deviceId)}`
        );
    }
}
