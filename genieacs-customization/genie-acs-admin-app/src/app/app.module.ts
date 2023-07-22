import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './modules/layout/app.layout.module';
import { NotfoundComponent } from './modules/@shared/components/notfound/notfound.component';
import { AuthGuard } from 'src/app/auth.guard';
import { EventService } from 'src/app/modules/@shared/services/event.service';
import { IconService } from 'src/app/modules/@shared/services/icon.service';
import { NodeService } from 'src/app/modules/@shared/services/node.service';
import { PhotoService } from 'src/app/modules/@shared/services/photo.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/modules/@core/intecetors/jwt.inteceptor';
import { HttpErrorCatchingInterceptor } from 'src/app/modules/@core/intecetors/http-error-catching.inteceptor';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, ToastModule],
    providers: [
        EventService,
        IconService,
        NodeService,
        PhotoService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorCatchingInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
