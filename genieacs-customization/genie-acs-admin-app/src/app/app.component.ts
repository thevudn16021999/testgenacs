import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { filter, mergeMap, tap } from 'rxjs';
import { ConfigApiService } from 'src/app/modules/@core/api-services/config/config.api-service';
import { AuthService } from 'src/app/modules/@core/services/auth.service';
import { ConfigService } from 'src/app/modules/@core/services/config.service';
import { GatewayResultService } from 'src/app/modules/@core/services/gateway-result.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [MessageService],
})
export class AppComponent implements OnInit {
    constructor(
        private readonly router: Router,
        private primengConfig: PrimeNGConfig,
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        private readonly configApiService: ConfigApiService,
        private readonly messageService: MessageService,
        private readonly gatewayResultService: GatewayResultService
    ) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.authService.isAuthenticated$
            .pipe(
                filter((val) => !!val),
                mergeMap(() => {
                    return this.configApiService.getAdminConfig$();
                }),
                tap((config) => this.configService.setAdminConfig(config))
            )
            .subscribe();
        this.authService.isAuthenticated$
            .pipe(filter((val) => !val))
            .subscribe(() => {
                this.router.navigate(['/auth/login']);
            });
        this.gatewayResultService.result$
            .pipe(filter((r) => !!r))
            .subscribe((r) => {
                this.messageService.add({
                    severity: r?.severity,
                    summary: r?.message,
                });
            });
    }
}
