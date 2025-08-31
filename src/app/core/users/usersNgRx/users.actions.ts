import { createAction, props } from "@ngrx/store";
import { userInterface } from "../../../../shared/sharedContent/entities";

export const LoadUsers = createAction(

    "[UsersNgRx] Load Users"

)


export const LoadUsersSuccessfully = createAction(

    "[UsersNgRx] Load Users Success",

    props< { usersNgRx : userInterface[] } >()

)


export const LoadUsersError = createAction(

    "[UsersNgRx] Load Users mistake or error ",

    props< { err : string | boolean } >()

)