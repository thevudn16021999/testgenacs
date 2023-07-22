import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, filter, of, takeUntil, tap } from 'rxjs';
import { LayoutService } from 'src/app/modules/layout/service/app.layout.service';
import { AuthService } from 'src/app/modules/@core/services/auth.service';
import { UnsubscriberService } from 'src/app/modules/@shared/services/unsubscriber.service';
import { AuthRequest } from 'src/app/modules/@core/api-services/auth/request-models/auth.request';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastSeverities } from 'src/app/modules/@shared/enums/toast-severities.enum';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
    providers: [UnsubscriberService, MessageService],
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];

    username: string = '';
    password: string = '';

    constructor(
        public readonly layoutService: LayoutService,
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly unsubscriber: UnsubscriberService,
        private readonly messageService: MessageService
    ) {}
    ngOnInit(): void {
        this.authService.isAuthenticated$
            .pipe(
                takeUntil(this.unsubscriber.destroy$),
                filter((isAuthenticated) => !!isAuthenticated),
                tap(() => this.router.navigate(['/dashboard']))
            )
            .subscribe();
    }

    signIn() {
        this.authService
            .signIn$(
                new AuthRequest(
                    this.username.toLocaleLowerCase(),
                    this.password
                )
            )
            .pipe(
                catchError((val: HttpErrorResponse) => {
                    console.log(val);
                    this.messageService.add({
                        severity: ToastSeverities.Error,
                        summary:
                            val.status === 400
                                ? 'Invalid credential!'
                                : 'Error!',
                    });
                    return of();
                })
            )
            .subscribe();
    }
}
