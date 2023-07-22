import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GatewayResultService } from 'src/app/modules/@core/services/gateway-result.service';
import { ToastSeverities } from 'src/app/modules/@shared/enums/toast-severities.enum';

@Injectable()
export class HttpErrorCatchingInterceptor implements HttpInterceptor {
    constructor(private readonly gatewayResultService: GatewayResultService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                const errorCode =
                    (error.status === 404 && 404) ||
                    (error.status === 403 && 403) ||
                    (error.status === 401 && 401) ||
                    500;

                const errorMsg =
                    (errorCode === 500 && 'Error! Please contact Admin.') ||
                    (errorCode === 404 && 'Resource not found!') ||
                    (errorCode === 403 && 'You have no permission!') ||
                    (errorCode === 401 &&
                        'Your session is expired! Please login again.') ||
                    '';

                this.gatewayResultService.push({
                    severity: ToastSeverities.Error,
                    code: errorCode,
                    message: errorMsg.toString(),
                });
                console.log(errorCode, errorMsg);
                return throwError(errorMsg);
            })
        );
    }
}
