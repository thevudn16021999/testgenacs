import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './modules/layout/app.layout.component';
import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from 'src/app/modules/@shared/components/notfound/notfound.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    canActivate: [AuthGuard],
                    children: [
                        {
                            path: 'dashboard',
                            loadChildren: () =>
                                import(
                                    './modules/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'provisions',
                            loadChildren: () =>
                                import(
                                    './modules/provision/provision.module'
                                ).then((m) => m.ProvisionModule),
                        },
                        {
                            path: 'virtual-parameters',
                            loadChildren: () =>
                                import(
                                    './modules/virtual-parameter/virtual-parameter.module'
                                ).then((m) => m.VirtualParameterModule),
                        },
                        {
                            path: 'devices',
                            loadChildren: () =>
                                import('./modules/device/device.module').then(
                                    (m) => m.DeviceModule
                                ),
                        },
                        {
                            path: 'files',
                            loadChildren: () =>
                                import('./modules/files/file.module').then(
                                    (m) => m.FileModule
                                ),
                        },
                        {
                            path: 'permissions',
                            loadChildren: () =>
                                import(
                                    './modules/permission/permission.module'
                                ).then((m) => m.PermissionModule),
                        },
                        {
                            path: 'users',
                            loadChildren: () =>
                                import('./modules/user/user.module').then(
                                    (m) => m.UserModule
                                ),
                        },
                        {
                            path: 'presets',
                            loadChildren: () =>
                                import('./modules/preset/preset.module').then(
                                    (m) => m.PresetModule
                                ),
                        },
                        {
                            path: 'admin-config',
                            loadChildren: () =>
                                import(
                                    './modules/admin-config/admin-config.module'
                                ).then((m) => m.AdminConfigModule),
                        },
                        {
                            path: 'version',
                            loadChildren: () =>
                                import('./modules/version/version.module').then(
                                    (m) => m.VersionModule
                                ),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./modules/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                // {
                //     path: 'landing',
                //     loadChildren: () =>
                //         import('./demo/components/landing/landing.module').then(
                //             (m) => m.LandingModule
                //         ),
                // },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
                useHash: true,
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
