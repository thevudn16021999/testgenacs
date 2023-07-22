import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { ServiceOptions } from 'ngx-localstorage/lib/interfaces/service-options';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private readonly defaultOptions: ServiceOptions = { prefix: 'ht-' };
    constructor(private lss: LocalStorageService) {}

    remove(key: string) {
        this.lss.remove(key, this.defaultOptions.prefix);
    }

    store(key: string, val: string) {
        this.lss.set(key, val, this.defaultOptions);
    }

    retrieve(key: string, defaultVal: string = ''): string {
        const val = this.lss.get<string>(key, this.defaultOptions);
        return val || defaultVal;
    }
}
