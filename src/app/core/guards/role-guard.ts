import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { RoutingPaths } from '../../../shared/urlRoutesEnum';

export const roleGuard : CanActivateFn = (route, state) : boolean => {


  const theRouter : Router = inject( Router )

  const authService : AuthService = inject( AuthService )

  //return authService.isAdmin()

  if( authService.isAdmin() === true ) {

    return authService.isAdmin()

  }
  else{

    setTimeout( () => {
      theRouter.navigate( [ RoutingPaths.NOT_FOUND_ROUTE ] )
    }, 1500 )

    return false

  }

};
