import { Injectable } from '@angular/core';
import { RoutingDB } from '../../../enumRoutesDB';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { studentInterface, userInterface } from '../../../shared/sharedContent/entities';
import { RoutingPaths } from '../../../shared/urlRoutesEnum';

@Injectable({
  providedIn: 'root'
})
export class UsersAPIService {

  private baseURL : string = RoutingDB.ENDPOINT_SECOND_APIio_DB

  constructor( private myHTTP : HttpClient ) { }


  getUsersThroughMockIO () : Observable<userInterface[]> {

    return this.myHTTP.get<userInterface[]>(`${this.baseURL}/${RoutingDB.USERS}`)

  }


  deleteUserInDB ( someUser : userInterface ) : Observable<void> {

    return this.myHTTP.delete<void>( `${this.baseURL}/${RoutingDB.USERS}/${someUser.id}` )

  }


  editUserInDB ( updatedUser : userInterface ) : Observable<userInterface> {

    return(

      this.myHTTP.put<userInterface>(
        `${this.baseURL}/${RoutingDB.USERS}/${updatedUser.id}` ,
        updatedUser
      )
    
    )

  }


}
