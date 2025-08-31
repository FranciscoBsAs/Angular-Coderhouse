import { createReducer, on } from '@ngrx/store'
import * as usersNgRxActions from './users.actions'
import { initialStateUsersNgRx } from './users.model'


export const usersNgRxReducer = createReducer(

    initialStateUsersNgRx,

    on( usersNgRxActions.LoadUsers, ( state ) => (

        {
            ...state
        }

    ) )
    ,
    on( usersNgRxActions.LoadUsersSuccessfully, ( state, { usersNgRx } ) => (

        {
            ...state,
            usersNgRx: usersNgRx
        }

    ) )
    ,
    on( usersNgRxActions.LoadUsersError, ( state, {err} ) => (

        {
            ...state,
            err: err ,
            usersNgRx: []
        }

    ) )

)