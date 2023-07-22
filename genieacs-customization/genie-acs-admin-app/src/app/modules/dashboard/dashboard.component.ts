import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
    Subscription,
    distinctUntilChanged,
    filter,
    fromEvent,
    map,
    withLatestFrom,
} from 'rxjs';
import { Product } from 'src/app/modules/@shared/api/product';
import { LayoutService } from 'src/app/modules/layout/service/app.layout.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConfigService } from 'src/app/modules/@core/services/config.service';
import { AuthService } from 'src/app/modules/@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    urlSafe?: SafeResourceUrl;
    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscriptions: Subscription[] = [];
    displayChart = false;

    constructor(
        public layoutService: LayoutService,
        private readonly sanitizer: DomSanitizer,
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        private readonly router: Router
    ) {
        this.subscriptions.push(
            this.layoutService.configUpdate$.subscribe(() => {
                this.initChart();
            }),
            this.configService.adminConfig$
                .pipe(
                    filter((c) => !!c.data.dashboardLink),
                    withLatestFrom(this.authService.jwt$)
                )
                .subscribe(([config, jwt]) => {
                    this.urlSafe =
                        this.sanitizer.bypassSecurityTrustResourceUrl(
                            config.data.dashboardLink + '?jwt=' + jwt
                        );
                    setTimeout(() => {
                        this.displayChart = true;
                    }, 500);
                }),
            fromEvent(window, 'message')
                .pipe(
                    filter((e: any) => !!e.data?.startsWith),
                    map((e: any) => e.data),
                    distinctUntilChanged(),
                    filter((url: string) => url.includes('#!/devices/'))
                )
                .subscribe((url) => {
                    const filterQueryParam = url.slice(
                        url.indexOf('?filter=') + 8
                    );
                    console.log('aaaa ', filterQueryParam);
                    this.router.navigate(['/devices'], {
                        queryParams: {
                            filter: decodeURIComponent(filterQueryParam),
                        },
                    });
                })
        );
    }

    ngOnInit() {
        this.initChart();
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    tension: 0.4,
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                },
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
