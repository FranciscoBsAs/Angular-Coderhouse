import { userInterface } from "../../../../shared/sharedContent/entities"

export interface usersNgRxInterface {

    usersNgRx : userInterface[],
    err : string | boolean

}

export const initialStateUsersNgRx : usersNgRxInterface = {

    usersNgRx: [],
    err: false

}