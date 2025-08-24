import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';

export const RoleGuard: CanActivateFn = (route, state) : boolean => {
  
  const theRouter : Router = inject( Router ) 

  const authService : AuthService = inject( AuthService ) 

  return authService.isAdmin()

};
