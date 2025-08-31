import { createAction, props } from "@ngrx/store"
import { userInterface } from "../../../shared/sharedContent/entities"

export interface email_password_Interface {
    email : string,
    password : string
}


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

    props< { error : string } >()

)


export const LogOut = createAction( '[Auth] LogOut' )