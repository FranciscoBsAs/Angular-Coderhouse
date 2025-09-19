import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { authStateInterface } from '../authNgRx/auth.model';
import { Store } from '@ngrx/store';
import { Login } from '../authNgRx/auth.actions';
import { errorsMessages } from '../../../shared/sharedContent/errorsMessages';
import { MatSnackBarService } from '../../../shared/sharedContent/mat-snack-bar-service';
import { MyMatCommonRouterModule } from '../../features/my-mat-common-router/my-mat-common-router-module';

@Component({
  selector: 'app-login-form-component',
  imports: [ ReactiveFormsModule, CommonModule, MyMatCommonRouterModule,  ],
  templateUrl: './login-form-component.html',
  styleUrl: './login-form-component.css'
})

export class LoginFormComponent implements OnInit {

  loginForm! : FormGroup

  private theAuthStore : Store< { auth : authStateInterface } > = inject( Store )

  readonly errorFormMessages = errorsMessages

  loggedUser$ : Observable< string | null > | null  = null  // sirve para debug


  constructor( 
    private myFormBuilder : FormBuilder,

    private snackBar : MatSnackBarService
  ) {}


  ngOnInit(): void {
    
    this.loginForm = this.myFormBuilder.group(
      {
        email: [ '', [ Validators.required, Validators.email ] ],
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
    else{ 
      this.snackBar.showFailedLogin()
    }

  }


  
  protected getUser () : void {

    this.loggedUser$ = this.theAuthStore.select( state => state.auth.email )

  }


}
