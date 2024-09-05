import { CanActivateFn, Router } from '@angular/router';
import { SignUpService } from '../../services/authentication/sign-up.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const homeguardGuard: CanActivateFn = async (route, state) => {
  let _SignUpService: SignUpService = inject(SignUpService);
  let _Router:Router = inject(Router)
  // if( _SignUpService.userDetails.getValue() != null)
  // {
  //   _Router.navigate(['/home']);
  //   return false;
  // }
  // else
  // {
  //   return true;
  // }


  const _PLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (localStorage.getItem('userToken') !== null) {
      _Router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }

};
