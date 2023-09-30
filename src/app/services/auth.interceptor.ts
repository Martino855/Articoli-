import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const excludes: string[] = [
      'https://24obs.glue-hosting.com/wp-json/jwt-auth/v1/token',
    ];

    if (excludes.includes(request.url)) {
      return next.handle(request);
    }
    const miaRichiesta = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenService.getToken()?.token}`,
      },
    });
    return next.handle(miaRichiesta);
  }
}
