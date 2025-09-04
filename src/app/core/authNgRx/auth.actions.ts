import { createAction, props } from "@ngrx/store"
import { email_password_Interface, userInterface } from "../../../shared/sharedContent/entities"



export const Login = createAction(

    '[Auth] Login',

    props<email_password_Interface>()

)


export const LoginSuccess = createAction(

    '[Auth] Login Success',

    props< { user : userInterface } >()

)


export const LoginFailure = createAction(

    '[Auth] Login Failure',

    props< { theError : string | null } >()

)


export const LogOut = createAction( '[Auth] LogOut' )