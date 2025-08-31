import { userInterface } from "../../../shared/sharedContent/entities";

export interface authStateInterface {

    email : string | null ,

    password : string | null,

    isLoggedIn : boolean,

    isAdmin : boolean,

    currentUser : userInterface | null
    
    isLoading : boolean

}


export const initialAuthState : authStateInterface = {

    email: null ,
    password: null,
    isLoggedIn: false,
    isAdmin: false,
    currentUser: null,
    isLoading: false

}