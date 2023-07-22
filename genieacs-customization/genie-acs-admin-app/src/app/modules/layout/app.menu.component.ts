import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: '',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['//dashboard'],
                    },
                    {
                        label: 'Provisions',
                        icon: 'pi pi-bolt',
                        routerLink: ['//provisions'],
                    },
                    {
                        label: 'Virtual Parameters',
                        icon: 'pi pi-code',
                        routerLink: ['//virtual-parameters'],
                    },
                    {
                        label: 'Devices',
                        icon: 'pi pi-th-large',
                        routerLink: ['//devices'],
                    },
                    {
                        label: 'Files',
                        icon: 'pi pi-file',
                        routerLink: ['//files'],
                    },
                    {
                        label: 'Permissions',
                        icon: 'pi pi-lock-open',
                        routerLink: ['//permissions'],
                    },
                    {
                        label: 'Users',
                        icon: 'pi pi-users',
                        routerLink: ['//users'],
                    },
                    {
                        label: 'Presets',
                        icon: 'pi pi-wrench',
                        routerLink: ['//presets'],
                    },
                    {
                        label: 'Configuration',
                        icon: 'pi pi-cog',
                        routerLink: ['//admin-config'],
                    },
                    {
                        label: 'Version',
                        icon: 'pi pi-map',
                        routerLink: ['//version'],
                    },
                ],
            },
        ];
    }
}
