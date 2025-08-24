import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';

export const roleGuard: CanActivateFn = (route, state) => {


  const theRouter : Router = inject( Router )

  const authService : AuthService = inject( AuthService )

  return authService.isAdmin()

};
