import { inject, Injectable } from '@angular/core';
import * as AuthActions from './auth.actions'
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth/auth-service';
import { catchError, of, switchMap, tap } from 'rxjs';
import { userInterface } from '../../../shared/sharedContent/entities';


@Injectable()

export class AuthEffects {

    private actions$ : Actions = inject( Actions )

    private authService : AuthService = inject( AuthService )

    //public loggedUser! : userInterface | null


    public logginEffects$ = createEffect( () => (

        this.actions$.pipe(

            ofType( AuthActions.Login ),

            switchMap( ( { email, password } ) => {

                const isLoggedIn = this.authService.logIn( email, password ) ;

                if( isLoggedIn ) {

                    const loggedUser = this.authService.getLoggedUser()

                    console.log( 'Login exitoso, ahora vinculando con AuthService  para ¿idAdmin()? ', loggedUser )
                    console.table( loggedUser )


                    return of(
                        AuthActions.LoginSuccess(
                            {
                                user: loggedUser as userInterface
                            }
                        )
                    )

                }
                else{
                    console.warn( "Login fallido, ahora no se esta vinculando con AuthService" )

                    return of( AuthActions.LoginFailure( { error: 'Usuarios o contraseña incorrectos' }))
                }
            } )
            ,

            catchError( ( err ) => {

                console.error( "Error en el efecto de login, ", err )

                return of(
                    AuthActions.LoginFailure( { error: 'Error inesperado en el sistema de autentificación' } )
                )

            } )

        )

    ) )



}