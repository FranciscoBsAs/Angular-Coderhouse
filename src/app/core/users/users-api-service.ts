import { Injectable } from '@angular/core';
import { RoutingDB } from '../../../enumRoutesDB';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userInterface } from '../../../shared/sharedContent/entities';

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

}
