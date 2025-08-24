import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { userInterface } from '../../../shared/sharedContent/entities';
import { AuthService } from '../auth/auth-service';
import { Router } from '@angular/router';
import { RoutingPaths } from '../../../shared/urlRoutesEnum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form-component',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './login-form-component.html',
  styleUrl: './login-form-component.css'
})
export class LoginFormComponent implements OnInit {

  loginForm! : FormGroup

  certainUser : userInterface | null = null


  constructor(
    private myFormBuilder : FormBuilder,
    private authAPI : AuthService,
    private theRouter : Router
  ){}


  ngOnInit(): void {
      
    this.loginForm = this.myFormBuilder.group(
      {
        email: [ '', [ Validators.required, Validators.minLength(3) ] ],
        password: [ '', [ Validators.required, Validators.minLength(3) ] ]
      }
    )

    this.authAPI.loadUsersFromAPI()

    this.authAPI.loggedUserEvent$.subscribe( ( us ) => {

      this.certainUser = us
      
      console.log( "Loggin user: ", us )

    } )

  }

  onSubmit () : void {

    if( this.loginForm.valid ) {

      const { email, password } = this.loginForm.value

      this.authAPI.logIn( email, password )

      if( this.authAPI.logIn( email, password ) ) {
        
        console.log( 'Loggin successful' )

        this.theRouter.navigate( [ RoutingPaths.STUDENTS ] )  //  de tener exito al loggearse Redirigir a students

      }
      else{
        console.error( 'Login failed' )
      }
      
    }
    else{
      console.error( 'Login form is invalid' )
    }



  }

}
