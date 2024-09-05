import { inject, PLATFORM_ID } from '@angular/core';
import { SignUpService } from './../../services/authentication/sign-up.service';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const loginguardGuard: CanActivateFn = async (route, state) => {
  let _SignUpService: SignUpService = inject(SignUpService);
  let _Router: Router =  inject(Router);

  // _SignUpService.decode()
  // if ( _SignUpService.userDetails.getValue() != null) return true;
  // else {
  //   _Router.navigate(['/login']);
  //   return false;
  // }


   const _PLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(_PLATFORM_ID)) {
    
    if (localStorage.getItem('userToken') !== null) {
      return true;
    }
    else {
      _Router.navigate(['/login'])
      return false
    }
  }
  else {
    return false
  }
};
