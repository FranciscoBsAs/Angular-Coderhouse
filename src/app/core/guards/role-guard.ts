import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { RoutingPaths } from '../../../shared/urlRoutesEnum';
import { Store } from '@ngrx/store';
import { selectIsAdmin, selectUser } from '../authNgRx/auth.selector';
import { map, Observable, take } from 'rxjs';
//import { LogOut } from '../authNgRx/auth.actions';

export const roleGuard : CanActivateFn = (route, state) : boolean | Observable<boolean | UrlTree> => {


  const theRouter : Router = inject( Router )

  const authService : AuthService = inject( AuthService )

  const theAuthStore : Store = inject( Store )


  theAuthStore.select( selectUser ).pipe(

    take(1)

  ).subscribe( user => console.log( 'Usuario, ', user, user?.role ) )



  return(

    theAuthStore.select( selectIsAdmin ).pipe(

      take(1),

      map( ( isAdmin ) => {

        console.log( "Valor original de isAdmin: ", isAdmin )


        if( isAdmin ){

          console.log( 'Is Admin: ', isAdmin )
          
          return true

        }else{

          console.log( 'Is Admin: ', isAdmin )
          theRouter.navigate( [RoutingPaths.NOT_FOUND_ROUTE] )
          return false

        }

      } )

    )

  )

};
