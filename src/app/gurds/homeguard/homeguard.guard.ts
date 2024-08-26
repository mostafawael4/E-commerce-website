import { CanActivateFn, Router } from '@angular/router';
import { SignUpService } from '../../services/authentication/sign-up.service';
import { inject } from '@angular/core';

export const homeguardGuard: CanActivateFn = async (route, state) => {
  let _SignUpService: SignUpService = inject(SignUpService);
  let _Router:Router = inject(Router)
  if( _SignUpService.userDetails.getValue() != null)
  {
    _Router.navigate(['/home']);
    return false;
  }
  else
  {
    return true;
  }

};
