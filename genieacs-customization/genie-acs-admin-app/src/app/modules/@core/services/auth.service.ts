import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { AuthRequest } from 'src/app/modules/@core/api-services/auth/request-models/auth.request';
import { AuthApiService } from 'src/app/modules/@core/api-services/auth/auth.api-service';
import { StorageService } from 'src/app/modules/@core/services/storage.service';
import { ConfigApiService } from 'src/app/modules/@core/api-services/config/config.api-service';
import { ConfigService } from 'src/app/modules/@core/services/config.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly jwtStorageKey = 'jwt';
    public readonly jwt$ = new BehaviorSubject<string>('');
    public readonly isAuthenticated$ = this.jwt$.asObservable().pipe(
        distinctUntilChanged(),
        map((token) => !!token)
    );
    private dashboardUrl = '';

    constructor(
        private readonly configService: ConfigService,
        private readonly storageService: StorageService,
        private readonly tokenApiService: AuthApiService
    ) {
        this.retrieveAuthInfoFromStorage();
        this.configService.adminConfig$.subscribe((c) => {
            this.dashboardUrl = c.data.dashboardLink;
        });
    }

    private retrieveAuthInfoFromStorage() {
        const jwt = this.storageService.retrieve(this.jwtStorageKey);
        this.jwt$.next(jwt);
    }

    signIn$(authReq: AuthRequest) {
        return this.tokenApiService.signIn$(authReq).pipe(
            map((authRes) => {
                this.storageService.store(this.jwtStorageKey, authRes.jwt);
                this.jwt$.next(authRes.jwt);
            })
        );
    }

    signOut() {
        if (this.dashboardUrl) {
            const popup = window.open(this.dashboardUrl + '?logout=true');
            setTimeout(() => {
                popup?.close();
            }, 2000);
        }
        this.tokenApiService.signOut$().subscribe(() => {
            this.storageService.remove(this.jwtStorageKey);
            this.jwt$.next('');
        });
    }
}
