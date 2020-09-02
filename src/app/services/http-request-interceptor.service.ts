import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestWithToken = this.addToken(req);
    return from(this.callHttp(requestWithToken, next));
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.loginService.getToken();
    return req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
  }

  private callHttp(requestWithToken: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    return next.handle(requestWithToken).pipe(tap((event: HttpEvent<any>) => {
    }, (err: any) => {
      this.handleError(err);
    })).toPromise();
  }

  private handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      const message = error.message + '. ' + error.error.message;
      if (error.status >= 400 && error.status < 500) {
        if (error.status === 401) {
          alert('You are unauthorized to this resource!');
        }
        this.openSnackBar(message, 'OK');
      } else if (error.status >= 500 && error.status < 600) {
        this.openSnackBar(message, 'OK', 5000);
      } else {
        alert(message);
      }
    } else {
      this.openSnackBar('Something went wrong!', 'OK', 6000);
    }
    return throwError(error);
  }

  private openSnackBar(message: string, action: string, duration?: number) {
    if (!duration) {
      duration = 3000;
    }
    this.snackBar.open(message, action, {
      duration,
    });
  }
}
