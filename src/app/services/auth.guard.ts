import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const user = tokenService.isAuthenticated();

  if (user) {
    return true;
  } else {
    router.navigate(['public']);
    return false;
  }
};
