import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private readonly loadingSubject = new BehaviorSubject(false);
    public readonly loading$ = this.loadingSubject.asObservable();
    constructor(private readonly router: Router) {
        this.router.events
            .pipe(filter((e) => e instanceof NavigationStart))
            .subscribe(() => this.unload());
    }

    load() {
        this.loadingSubject.next(true);
    }

    unload() {
        this.loadingSubject.next(false);
    }
}
