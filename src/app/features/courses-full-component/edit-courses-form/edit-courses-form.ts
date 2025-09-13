import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Navigation, Router, RouterModule } from '@angular/router';
import { CoursesAPIService } from '../courses-api-service';
import { courseInterface } from '../../../../shared/sharedContent/entities';
import { RoutingPaths } from '../../../../shared/urlRoutesEnum';

import * as myCustomValidators from '../../../../shared/validatorFunctions/ValidatorFunctions'
import { MatSnackBarService } from '../../../../shared/sharedContent/mat-snack-bar-service';
import { errorsMessages } from '../../../../shared/sharedContent/errorsMessages';


@Component({
  selector: 'edit-courses-form',
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule ],
  templateUrl: './edit-courses-form.html',
  styleUrl: './edit-courses-form.css'
})

export class EditCoursesForm implements OnInit {

  editCourseForm! : FormGroup ;

  courseChosenToEdit! : courseInterface | null
  
  updatedCourse! : courseInterface 
  
  errorMessages = errorsMessages


  constructor( 
    private myFormBuilder : FormBuilder,
    private theRouter : Router,
    private coursesAPI : CoursesAPIService ,
    private snackBar : MatSnackBarService
  ){
    const theCurrentNavigation : Navigation | null = this.theRouter.getCurrentNavigation()

    this.courseChosenToEdit = theCurrentNavigation?.extras?.state?.['courseSelectedToEdit']

  }
  

  
  ngOnInit() : void {

    this.editCourseForm = this.myFormBuilder.group(
      {
        name: ['', [ Validators.required, myCustomValidators.onlyLettersValidator, myCustomValidators.notEmoticonValidator] ],
        code: ['' , [ Validators.required, myCustomValidators.notEmoticonValidator ] ],
        credits: ['', [ Validators.required, Validators.pattern(/^-?\d+(?:,\d+)?$/) ]],
        id: ['']
      }
    )

    if( this.courseChosenToEdit ) {

      this.editCourseForm.patchValue( this.courseChosenToEdit )

    }

  }

  
  
  onsubmit() {

    if ( this.editCourseForm.valid ) {

      this.updatedCourse = { ...this.editCourseForm.getRawValue() }

    }

    this.coursesAPI.editStudentInDB( this.updatedCourse ).subscribe(
      {
        next: () => {

          this.snackBar.showSuccessEdit_SnackBar('Curso', 'Cerrar')

          setTimeout( () => {

            this.theRouter.navigate( [ RoutingPaths.COURSES ] )

          } , 3500 )

        },
        error: () => this.snackBar.showNotFound_SnackBar( 'Curso', 'Cerrar' )
      }
    )
  }


  handleOnReset() {
    this.editCourseForm.reset()
  }


}
