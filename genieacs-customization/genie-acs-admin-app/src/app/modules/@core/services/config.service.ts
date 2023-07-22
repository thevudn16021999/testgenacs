import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminConfigResponse } from 'src/app/modules/@core/api-services/config/response-models/admin-config.response';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    constructor() {}
    private readonly adminConfigSubject$ =
        new BehaviorSubject<AdminConfigResponse>({
            _id: '',
            value: '',
            type: '',
            data: {
                dashboardLink: '',
                downloadRatio: 1,
                downloadOptionText01: '',
                downloadOptionLink01: '',
                downloadOptionText02: '',
                downloadOptionLink02: '',
                downloadOptionText03: '',
                downloadOptionLink03: '',
                downloadOptionText04: '',
                downloadOptionLink04: '',
                downloadOptionText05: '',
                downloadOptionLink05: '',
                downloadOptionText06: '',
                downloadOptionLink06: '',
                downloadOptionText07: '',
                downloadOptionLink07: '',
                downloadOptionText08: '',
                downloadOptionLink08: '',
                downloadOptionText09: '',
                downloadOptionLink09: '',
                downloadOptionText10: '',
                downloadOptionLink10: '',
                uploadLink: '',
                uploadRatio: 1,
                uploadOptionText01: '',
                uploadOptionSize01: '',
                uploadOptionText02: '',
                uploadOptionSize02: '',
                uploadOptionText03: '',
                uploadOptionSize03: '',
                uploadOptionText04: '',
                uploadOptionSize04: '',
                uploadOptionText05: '',
                uploadOptionSize05: '',
                uploadOptionText06: '',
                uploadOptionSize06: '',
                uploadOptionText07: '',
                uploadOptionSize07: '',
                uploadOptionText08: '',
                uploadOptionSize08: '',
                uploadOptionText09: '',
                uploadOptionSize09: '',
                uploadOptionText10: '',
                uploadOptionSize10: '',
                txThroughputMin: 0,
                txThroughputMax: 0,
                rxThroughputMin: 0,
                rxThroughputMax: 0,
            },
        });
    public readonly adminConfig$ = this.adminConfigSubject$.asObservable();
    setAdminConfig(config: AdminConfigResponse) {
        this.adminConfigSubject$.next(config);
    }
    public readonly version = '2023-04-14T14:03:09.753Z';
    public readonly NoTestSpeedProductClasses = ['H660EM', 'Archer C64'];
    public readonly paginationConfig = {
        page: 0,
        take10: 10,
        take25: 25,
        take50: 50,
        takeAll: Number.MAX_SAFE_INTEGER,
    };
}
