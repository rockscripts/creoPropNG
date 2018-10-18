import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../providers/user.service';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(
    private US :      UserService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with basic auth credentials if available
      if (this.US.logeado()) {
          request = request.clone({
              setHeaders: { 
                  Authorization: `Basic ${this.US.getToken()}`
              }
          });
      }

      return next.handle(request);
  }
}