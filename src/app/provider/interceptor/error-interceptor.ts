import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorMessage } from 'src/app/config/constants';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public mainService: MainService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    this.mainService.hideSpinner();
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                    //     errorMessage = `Error: ${error.error.message}`;
                    //     this.mainService.toasterErr(errorMessage);
                    // } else {
                    //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    //     switch (error.status) {
                    //         case 401:
                    //             // this.mainService.toasterErr(ErrorMessage.error_401);
                    //             // this.mainService.onLogout();
                    //             break;
                    //         case 404:
                    //             // this.mainService.toasterErr(ErrorMessage.error_404);
                    //             break;
                    //         default:
                    //             // this.mainService.toasterErr(ErrorMessage.somethingWentWrong);
                    //             break;
                    //     }
                    }
                    return throwError(errorMessage)
                })
            )
    }
}