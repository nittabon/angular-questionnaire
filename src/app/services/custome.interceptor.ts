import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CustomeInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow

    if (err.status === 401 || err.status === 403) {
      console.log(err);
        //navigate /delete cookies or whatever
        localStorage.clear();
        this.router.navigateByUrl('/login');
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        //return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //debugger;
    const token = localStorage.getItem('loginTOken');
    const newCloneRequest = request.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })
    return next.handle(newCloneRequest);//.pipe(catchError(x=>this.handleAuthError(x)));
  }
}
