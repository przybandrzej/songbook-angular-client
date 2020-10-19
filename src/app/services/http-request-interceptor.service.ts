import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, ObservableInput, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {tap} from 'rxjs/operators';
import {Location} from '@angular/common';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router, private snackBar: MatSnackBar, private location: Location) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestWithToken = this.addToken(req);
    return this.callHttp(requestWithToken, next);
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = AuthService.getToken();
    return req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
  }

  private callHttp(requestWithToken: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(requestWithToken).pipe(tap(
      () => {
      },
      (err: any) => {
        this.handleError(err, requestWithToken);
      }));
  }

  private handleError(error: any, request: HttpRequest<any>): ObservableInput<any> | void {
    const message = error.error.message;
    if (error.status >= 400 && error.status < 500) {
      if (error.status === 401) {
        this.injector.get(AuthService).setLoggedOut();
        this.router.navigateByUrl('login');
      } else if (error.status === 404) {
        return;
      } else if (error.status === 400) {
        if (request.url.includes('register') && request.method.includes('POST')) {
          return;
        } else if (request.url.includes('api/songs') && (request.method.includes('POST') || request.method.includes('PUT') || request.method.includes('PATCH'))) {
          return;
        } else if (request.url.includes('api/authors') && (request.method.includes('POST') || request.method.includes('PUT'))) {
          return;
        } else if (request.url.includes('api/coauthors') && (request.method.includes('POST') || request.method.includes('PUT'))) {
          return;
        }
      }
      this.openSnackBar(message, 'OK');
    } else if (error.status >= 500 && error.status < 600) {
      this.openSnackBar(message, 'OK', 5000);
      return throwError(error);
    } else {
      alert(message);
      return throwError(error);
    }
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
