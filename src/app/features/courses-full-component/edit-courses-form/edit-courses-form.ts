import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Navigation, Router, RouterModule } from '@angular/router';
import { CoursesAPIService } from '../courses-api-service';
import { courseInterface } from '../../../../shared/sharedContent/entities';
import { MatSnackBar, MatSnackBarConfig, TextOnlySnackBar } from '@angular/material/snack-bar'
import { RoutingPaths } from '../../../../shared/urlRoutesEnum';

import * as myCustomValidators from '../../../../shared/validatorFunctions/ValidatorFunctions'


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

  private _myEditorCourseSnackBar : MatSnackBar = inject( MatSnackBar )

  private configurationOfMySnackBar : MatSnackBarConfig< TextOnlySnackBar > = {

    duration: 3000

  }
  

  constructor( 
    private myFormBuilder : FormBuilder,
    private theRouter : Router,
    private coursesAPI : CoursesAPIService
  ){
    const theCurrentNavigation : Navigation | null = this.theRouter.getCurrentNavigation()

    this.courseChosenToEdit = theCurrentNavigation?.extras?.state?.['courseSelectedToEdit']

  }
  

  
  ngOnInit() : void {

      this.editCourseForm = this.myFormBuilder.group(
        {
          name: ['', [myCustomValidators.onlyLettersValidator, myCustomValidators.notEmoticonValidator] ],
          code: ['' , [ myCustomValidators.notEmoticonValidator ] ],
          credits: ['', [ Validators.pattern(/^-?\d+(?:,\d+)?$/) ]],
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

            this.theRouter.navigate( [ RoutingPaths.COURSES ] )

            this.showSuccesEdit_SnackBar()

          },
          error: ( err ) => { 
            console.error('Error al editar curso', err) ,
            this.showNotFounded_SnackBar() 
          }
        }
      )
  }


  handleOnReset() {
    this.editCourseForm.reset()
  }


  private showSuccesEdit_SnackBar() {
    const message = 'Curso editado correctamente'
    const action = 'Cerrar'
    
    this._myEditorCourseSnackBar.open( message, action, this.configurationOfMySnackBar )
  }


  private showNotFounded_SnackBar () {

    const messageNotFound = 'Curso no encontrado'
    const actionNotFound : string = 'Cerrar'

    this._myEditorCourseSnackBar.open( messageNotFound, actionNotFound, this.configurationOfMySnackBar ) 

  }

}
