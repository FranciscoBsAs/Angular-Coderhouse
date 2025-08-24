import { Injectable } from '@angular/core';
import { userInterface } from '../../../shared/sharedContent/entities';
import { BehaviorSubject } from 'rxjs';
import { UsersAPIService } from '../users/users-api-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersDataArray : userInterface[] = []

  private loggedUserSubject = new BehaviorSubject< userInterface | null >(null)
  
  public loggedUserEvent$ = this.loggedUserSubject.asObservable()


  constructor( private usersAPI : UsersAPIService ) { }

  
  loadUsersFromAPI () : void {

    this.usersAPI.getUsersThroughMockIO().subscribe( ( users ) => {

      this.usersDataArray = users

      console.log( 'Usuarios cargados', this.usersDataArray )

    } )
  }

  logIn ( theEmail : string, thePassword : string ) : boolean {

    if( this.usersDataArray.length === 0 ) {
      console.error( 'Los datos de usarios no estan están cargados' )
      return false
    }

    // check if it's admin or common user

    const certainUser = this.usersDataArray.find( (u) => u.email === theEmail && u.password === thePassword )

    if( certainUser ) {

      this.loggedUserSubject.next(
        {
          email: certainUser.email,
          userName: certainUser.userName,
          password: certainUser.password,
          id: certainUser.id,
          role: certainUser.role
        }
      )
      return true
    }

    return false

  }

  getLoggedUser () : userInterface | null {
    return this.loggedUserSubject.getValue()
  }

  // check if it's admin

  isAdmin () : boolean {    
    // implement your logic to check if the user is and admin

    const loggedUser = this.getLoggedUser()

    return loggedUser?.role === 'admin'

  }
  

}
