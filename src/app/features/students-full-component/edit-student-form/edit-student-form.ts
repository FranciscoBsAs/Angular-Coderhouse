import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { studentInterface } from '../../../../shared/sharedContent/entities';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Navigation, Router, RouterModule } from '@angular/router';
import { StudentsAPIService } from '../students-api-service';
import { RoutingPaths } from '../../../../shared/urlRoutesEnum';

import * as myCustomValidators from '../../../../shared/validatorFunctions/ValidatorFunctions'
import { MatSnackBarService } from '../../../../shared/sharedContent/mat-snack-bar-service';


@Component({
  selector: 'edit-student-form',
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule ],
  templateUrl: './edit-student-form.html',
  styleUrl: './edit-student-form.css'
})

export class EditStudentForm implements OnInit {

  editStudentForm! : FormGroup ;

  studentChosenToEdit! : studentInterface | null 

  updatedStudent! : studentInterface


  constructor( 
    private myFormBuilder : FormBuilder,
    private theRouter : Router,
    private studentsAPI : StudentsAPIService ,
    private snackBar : MatSnackBarService
  ) {

    const theCurrentNavigation : Navigation | null = this.theRouter.getCurrentNavigation() ;
    
    this.studentChosenToEdit = theCurrentNavigation?.extras?.state?.[ 'studentToEdit' ] ?? null

  }

  ngOnInit(): void { // este hook grlmente se usa para pedir datos a una API o para cambiar/operar datos del template
      this.editStudentForm = this.myFormBuilder.group(
        {
          dni: [''],
          id: [''],
          name: ['', [Validators.required, myCustomValidators.onlyLettersValidator,  myCustomValidators.firstLetterUpperCaseValidator ] ],
          surname: ['', [Validators.required, myCustomValidators.onlyLettersValidator, myCustomValidators.firstLetterUpperCaseValidator ] ],
          age: ['', [Validators.required, myCustomValidators.notEmoticonValidator ] ],
          average: ['', [Validators.required, myCustomValidators.averageSup0, Validators.max(10)]],
        }
      )

      
      if ( this.studentChosenToEdit ) {

        this.editStudentForm.patchValue( this.studentChosenToEdit )

      }


  }

  onSubmit() {

    if ( this.editStudentForm.valid ) {

      this.updatedStudent = { ...this.editStudentForm.getRawValue() }
    
    }

    this.studentsAPI.editStudentInDB( this.updatedStudent ).subscribe(
      {
        next: () => {

          this.snackBar.showSuccessEdit_SnackBar( 'Estudiante', 'Cerrar' )

          this.theRouter.navigate( [ RoutingPaths.STUDENTS ] )

        },
        error: () => {  this.snackBar.showNotFound_SnackBar('Estudiante', 'Cerrar') }
        
      }
    )

  }

  handleOnReset() {
    this.editStudentForm.reset()
  }


}
