import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/modules/@core/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly authService: AuthService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.authService.isAuthenticated$.pipe(
            take(1),
            map((isAuthenticated: boolean) => {
                if (!isAuthenticated) {
                    this.router.navigate(['/auth/login']);
                }
                return isAuthenticated;
            })
        );
    }
}
