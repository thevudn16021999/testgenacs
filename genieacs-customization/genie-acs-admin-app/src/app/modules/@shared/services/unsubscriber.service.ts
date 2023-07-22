import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class UnsubscriberService implements OnDestroy {
    private readonly _destroy$ = new Subject<void>();
    public readonly destroy$ = this._destroy$.asObservable();

    private readonly managedSubscriptions: Subscription[] = [];

    public ngOnDestroy(): void {
        this.managedSubscriptions.forEach((s) => s.unsubscribe());
        this._destroy$.next();
        this._destroy$.complete();
    }
}
