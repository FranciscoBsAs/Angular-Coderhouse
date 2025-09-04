import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { userInterface } from '../../../shared/sharedContent/entities';
import { AuthService } from '../auth/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { authStateInterface } from '../authNgRx/auth.model';
import { Store } from '@ngrx/store';
import { LoadUsers } from '../users/usersNgRx/users.actions';
import { Login } from '../authNgRx/auth.actions';
import { selectEror, selectIsLoading } from '../authNgRx/auth.selector';

@Component({
  selector: 'app-login-form-component',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './login-form-component.html',
  styleUrl: './login-form-component.css'
})
export class LoginFormComponent implements OnInit {

  loginForm! : FormGroup

  private theAuthStore : Store< { auth : authStateInterface } > = inject( Store )
  
  isLoading$ : Observable<boolean> = this.theAuthStore.select( selectIsLoading )
  
  error$ : Observable<string | null> = this.theAuthStore.select( selectEror )

  
  loggedUser$ : Observable< string | null > | null  = null  // si te sirve para debug


  constructor( 
    private myFormBuilder : FormBuilder,
    private theRouter : Router,

    public authServices : AuthService,
  ) {}


  ngOnInit(): void {

    this.authServices.loadUsersFromAPI()
    
    this.loginForm = this.myFormBuilder.group(
      {
        email: [ '', [ Validators.required, Validators.minLength(3)] ],
        password: [ '', [ Validators.required, Validators.minLength(3) ] ]
      }
    )

    // opcional para debug: mostrar el email del auth state
    this.loggedUser$ = this.theAuthStore.select( (state) => state.auth.email )    // NUEVO,  Seleccionar el email usuario logueado desde el store
  }


  onSubmit () {

    if( this.loginForm.valid ) {

      const { email, password } = this.loginForm.value
      
      this.theAuthStore.dispatch( Login(
        {
          email: email ,
          password: password 
        } 
      ) )
      
    }
    else{ console.error( 'Login form is invalidad' ) }

  }


  
  getUser () : void {

    this.loggedUser$ = this.theAuthStore.select( state => state.auth.email )

  }




  getTitle () : string {
    
    // si estamos en tan pagina ,el titulo... switch,

    return "Título Incorrecto"

  }

}
