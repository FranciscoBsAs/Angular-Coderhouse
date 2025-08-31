import { inject, Injectable } from '@angular/core';
import * as usersNgRxActions from './users.actions'
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersAPIService } from '../users-api-service';
import { catchError, map, of, switchMap } from 'rxjs';


@Injectable()

export class UsersNgRxEffects {

    private actions$ = inject( Actions ) ;

    private usersAPI : UsersAPIService = inject( UsersAPIService )


    loadUsersNgRx$ = createEffect ( () => (

        this.actions$.pipe(

            ofType( usersNgRxActions.LoadUsers ) ,

            switchMap( () => this.usersAPI.getUsersThroughMockIO().pipe(

                map( (usersData) => {

                    console.log( ' Usuarios cargados existosamente ', usersData )

                    return usersNgRxActions.LoadUsersSuccessfully(
                        {
                            usersNgRx: usersData
                        }
                    )

                } )
                ,
                catchError( ( err ) => of( usersNgRxActions.LoadUsersError( { err } ) ) )
                    
            ) )
        )

    ) )
}