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
            
            isLoading: true,

            isLoggedIn: false,

            theError: null
            
        }
    ) )
    ,
    on( AuthActions.LoginSuccess, ( state, { user } ) => (

        {
            ...state,

            currentUser: user,

            isLoading: false,

            isLoggedIn: true ,

            theError: null,


        }

    ) )
    ,

    on( AuthActions.LoginFailure, ( state, { theError } ) => (

        {
            ...state,

            isLoading: false,

            currentUser: null ,

            isLoggedIn: false,

            theError: theError as string
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

            isLoading: false,

            theError: null

            //isAdmin: false
        }

    ) )

)