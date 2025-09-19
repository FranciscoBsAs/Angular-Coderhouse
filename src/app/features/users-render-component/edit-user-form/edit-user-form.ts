import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Navigation, Router, RouterModule } from '@angular/router';
import { userInterface } from '../../../../shared/sharedContent/entities';
import { UsersAPIService } from '../../../core/users/users-api-service';

import * as myCustomValidators from '../../../../shared/validatorFunctions/ValidatorFunctions'
import { RoutingPaths } from '../../../../shared/urlRoutesEnum';
import { MatSnackBarService } from '../../../../shared/sharedContent/mat-snack-bar-service';
import { errorsMessages } from '../../../../shared/sharedContent/errorsMessages';


@Component({
  selector: 'app-edit-user-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './edit-user-form.html',
  styleUrl: './edit-user-form.css'
})

export class EditUserForm implements OnInit {

  editUserForm! : FormGroup

  userChosenToEdit! : userInterface | null

  updatedUser! : userInterface

  public readonly errorsMessages = errorsMessages


  constructor(
    private myFormBuilder : FormBuilder ,
    private theRouter : Router ,
    private usersAPI : UsersAPIService,
    private snackBar : MatSnackBarService
  ){
    
    const theCurrentNavigation : Navigation | null = this.theRouter.getCurrentNavigation()

    this.userChosenToEdit = theCurrentNavigation?.extras?.state?.['userSelectedToEdit']

  }


  ngOnInit(): void {
      
    this.editUserForm = this.myFormBuilder.group(

      {
        id: [ '',],
        userName: [ '', [ Validators.required, myCustomValidators.firstLetterUpperCaseValidator, myCustomValidators.onlyLettersValidator ] ] ,
        email: [ '', [ Validators.required, Validators.email, myCustomValidators.notEmoticonValidator ]  ] ,
        role: [ '', [ Validators.required, myCustomValidators.onlyLettersValidator ] ]
      }

    )

    if( this.userChosenToEdit ) {

      this.editUserForm.patchValue( this.userChosenToEdit )

    }
  }


  onSubmit () {

    if( this.editUserForm.valid ) {

      this.updatedUser = { ...this.editUserForm.getRawValue() }

    }

    this.usersAPI.editUserInDB( this.updatedUser ).subscribe( 

      {
        next: () => {
          
          this.snackBar.showSuccessEdit_SnackBar( 'Usuario', 'Cerrar' )

          setTimeout( () => {
            this.theRouter.navigate( [ RoutingPaths.USERS ] )
          }, 3500 )

        },
        error: () => this.snackBar.showNotFound_SnackBar( 'Usuario', 'Cerrar' )

      }
    )

  }
  
  public handleOnReset () {
    this.editUserForm.reset()
  }

}
