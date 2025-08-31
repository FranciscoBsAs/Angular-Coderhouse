import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { userInterface } from '../../../shared/sharedContent/entities';
import { AuthService } from '../auth/auth-service';
import { Router } from '@angular/router';
import { RoutingPaths } from '../../../shared/urlRoutesEnum';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { authStateInterface } from '../authNgRx/auth.model';
import { Store } from '@ngrx/store';
import { LoadUsers } from '../users/usersNgRx/users.actions';
import { Login } from '../authNgRx/auth.actions';

@Component({
  selector: 'app-login-form-component',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './login-form-component.html',
  styleUrl: './login-form-component.css'
})
export class LoginFormComponent implements OnInit {

  loginForm! : FormGroup

  certainUser : userInterface | null = null

  // Nuevo con NgRx = New NgRx

  public loggedUser$! : Observable< string | null >   // New NgRx

  public usersFromNgRx$! : Observable<userInterface>   // New NgRx
  


  constructor(
    private myFormBuilder : FormBuilder,
    private authAPI : AuthService,
    private theRouter : Router,


    private theAuthStore : Store< { auth: authStateInterface } >,   // New NgRx

    private usersNgRxStorage : Store< { usersNgRx : userInterface } >   // New NgRx

  ){}


  ngOnInit(): void {

    this.authAPI.loadUsersFromAPI()
      
    this.loginForm = this.myFormBuilder.group(
      {
        email: [ '', [ Validators.required, Validators.minLength(3) ] ],
        password: [ '', [ Validators.required, Validators.minLength(3) ] ]
      }
    )


    /*  New NgRx
    this.authAPI.loggedUserEvent$.subscribe( ( us ) => {

      this.certainUser = us
      
      console.log( "Loggin user: ", us )

    } )
    */

    this.loggedUser$ = this.theAuthStore.select( ( state ) => state.auth.email )    // New NgRx

    this.loggedUser$.subscribe( ( user ) => {     // New NgRx

      if( user ){ console.log( 'User obtenido: ', user ) }    // New NgRx

    } )

    
    this.usersFromNgRx$ = this.usersNgRxStorage.select( state => state.usersNgRx )    // New NgRx


  }


  getUser () : void {

    this.loggedUser$ = this.theAuthStore.select( state => state.auth.email )

  }


  loadUsersMethod () {
    this.theAuthStore.dispatch( LoadUsers() )
  }


  onSubmit () : void {

    if( this.loginForm.valid ) {

      const { email, password } = this.loginForm.value

      this.theAuthStore.dispatch( Login(
        {
          email: email,
          password: password
        }
      ) )

      this.theRouter.navigate( [ RoutingPaths.STUDENTS ] )

      //this.authAPI.logIn( email, password )   // New NgRx

      /*
      if( this.authAPI.logIn( email, password ) ) {
        
        console.log( 'Loggin successful' )

        this.theRouter.navigate( [ RoutingPaths.STUDENTS ] )  //  de tener exito al loggearse Redirigir a students

      }
      else{
        console.error( 'Login failed' )
      }
      */
    }
    else{
      console.error( 'Login form is invalid' )
    }



  }

}
