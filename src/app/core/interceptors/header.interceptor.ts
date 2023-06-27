import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private stateService: StateService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let requestCopy!: any;
    const jwt: any =
      this.stateService.userInfo ||
      JSON.parse(sessionStorage.getItem('objUser')!);

    if (jwt)
      requestCopy = request.clone({
        setHeaders: { authorization: `Bearer ${jwt.token}` },
      });

    return next.handle(requestCopy || request);
  }
}
