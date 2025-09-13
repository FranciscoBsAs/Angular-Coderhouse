import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as AuthActions from './auth.actions'
import { catchError, map, of, switchMap, tap } from "rxjs";
import { userInterface } from "../../../shared/sharedContent/entities";
import { UsersAPIService } from "../users/users-api-service";
import { Router } from "@angular/router";
import { RoutingPaths } from "../../../shared/urlRoutesEnum";

@Injectable ()

export class AuthEffects {

    private actions$ : Actions = inject( Actions )

    private usersAPI : UsersAPIService = inject( UsersAPIService ) 

    private theRouter : Router = inject( Router )

    
    logginEffect$ = createEffect ( () => (

        this.actions$.pipe(


            ofType( AuthActions.Login ),


            switchMap( ( { email, password } ) => ( 

                this.usersAPI.getUsersThroughMockIO().pipe(

                    map( (usersData) => {

                        const user = usersData.find( ( u ) => u.email === email as string  &&  u.password === password as string )

                        console.log('Usuario encontrado:', user); // <-- Verifica el objeto


                        return (
                            user 
                                ? AuthActions.LoginSuccess( { user: user } ) 
                                : AuthActions.LoginFailure( { theError: "Usuarios o contraseña incorrectos" } )
                        )

                    } )
                    
                    ,

                    catchError( ( err : string ) => of( AuthActions.LoginFailure(  { theError: 'Error inesperado en el sistema de autentificación... ' +  err }  ) ) )

                )

            ) ),

            
        )

    ) )

    // Navegar cuando el login sale bien (sin dispatch)
    loginNavigate$ = createEffect( () => (

        this.actions$.pipe(
            
            ofType( AuthActions.LoginSuccess ),

            tap( () => {

                this.theRouter.navigate( [RoutingPaths.STUDENTS] )

            } )

        )


    ),
        { dispatch: false }
    )



    // Navegar al hacer logout (sin dispatch)
    public logoutNavigate$ = createEffect(

        () => 

            this.actions$.pipe(

                ofType( AuthActions.LogOut ),

                tap( () => {

                    //localStorage.removeItem('auth')
                    this.theRouter.navigate( [ RoutingPaths.HOME ] )


                } )

            )
        
        ,
        { dispatch: false }
        
        /*
            Segun COPILOT:
            El parámetro { dispatch: false } en un efecto de NgRx significa que ese efecto no va a despachar (emitir) ninguna acción al store.

            Se usa cuando el efecto realiza una tarea secundaria (side effect) como navegación, mostrar un toast,
             loguear en consola, etc., pero no necesita actualizar el estado de NgRx.
        */

    )

}