import { inject } from '@angular/core';
import { SignUpService } from './../../services/authentication/sign-up.service';
import { CanActivateFn, Router } from '@angular/router';

export const loginguardGuard: CanActivateFn =  (route, state) => {
  let _SignUpService: SignUpService = inject(SignUpService);
  let _Router: Router = inject(Router);
  if ( _SignUpService.userDetails.getValue() != null) return true;
  else {
    _Router.navigate(['/login']);
    return false;
  }
};
