import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastSeverities } from 'src/app/modules/@shared/enums/toast-severities.enum';

export interface GatewayResult {
    severity: ToastSeverities;
    code: number;
    message: string;
    data?: any;
}

@Injectable({
    providedIn: 'root',
})
export class GatewayResultService {
    private readonly msgSubject = new BehaviorSubject<
        GatewayResult | undefined
    >(undefined);
    public readonly result$ = this.msgSubject.asObservable();

    constructor() {}

    push(result: GatewayResult) {
        this.msgSubject.next(result);
    }
}
