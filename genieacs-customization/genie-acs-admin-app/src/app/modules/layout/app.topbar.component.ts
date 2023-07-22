import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from 'src/app/modules/@core/services/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private readonly authService: AuthService
    ) {}
    ngOnInit(): void {
        this.items = [
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => {
                    console.log('Logout');
                    this.authService.signOut();
                },
            },
        ];
        // const items = [
        //     {
        //         label: 'Options',
        //         items: [
        //             {
        //                 label: 'Update',
        //                 icon: 'pi pi-refresh',
        //                 command: () => {
        //                     this.update();
        //                 },
        //             },
        //             {
        //                 label: 'Delete',
        //                 icon: 'pi pi-times',
        //                 command: () => {
        //                     this.delete();
        //                 },
        //             },
        //         ],
        //     },
        //     {
        //         label: 'Navigate',
        //         items: [
        //             {
        //                 label: 'Angular',
        //                 icon: 'pi pi-external-link',
        //                 url: 'http://angular.io',
        //             },
        //             {
        //                 label: 'Router',
        //                 icon: 'pi pi-upload',
        //                 routerLink: '/fileupload',
        //             },
        //         ],
        //     },
        // ];
    }
}
