import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const miaRichiesta = request.clone(
      {
        setHeaders: {
          'Authorization': `Bearer ${this.tokenService.getToken()?.access_token}`
        }
      }
    )
    return next.handle(miaRichiesta);
  }
  
}
