import { userInterface } from "../../../shared/sharedContent/entities";

export interface authStateInterface {

    email : string | null ,

    password : string | null,

    isLoggedIn : boolean,

    isAdmin : boolean,

    currentUser : userInterface | null
    
    isLoading : boolean,

    theError : string | null

}


export const initialAuthState : authStateInterface = {

    email: null ,
    password: null,
    currentUser: null,
    isLoggedIn: false,
    isAdmin: false,
    isLoading: false ,

    theError: null


}