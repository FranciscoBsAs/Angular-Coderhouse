import { createReducer, on } from "@ngrx/store";

import * as AuthActions from './auth.actions'
import { initialAuthState } from "./auth.model";


export const authReducer = createReducer(

    initialAuthState,

    on( AuthActions.Login, ( state, { email, password } ) => (
        
        {
            ...state,
            email: email,
            password: password,
            isLoggedIn: true,

            // esta bien esto?
            isLoading: true
        }
    ) )
    ,
    on( AuthActions.LoginSuccess, ( state, { user } ) => (

        {
            ...state,
            currentUser: user,
            isLoading: false,
            isLoggedIn: true
        }

    ) )
    ,
    on( AuthActions.LogOut, ( state ) => (

        {
            ...state,
            email: null,
            password: null,
            isLoggedIn: false,
            
            currentUser: null,
            //isAdmin: false
        }

    ) )

)