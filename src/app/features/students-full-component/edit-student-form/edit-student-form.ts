import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { studentInterface } from '../../../../shared/sharedContent/entities';
import { MatSnackBar, MatSnackBarConfig, TextOnlySnackBar } from '@angular/material/snack-bar'
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Navigation, Router, RouterModule } from '@angular/router';
import { StudentsAPIService } from '../students-api-service';
import { RoutingPaths } from '../../../../shared/urlRoutesEnum';

import * as myCustomValidators from '../../../../shared/validatorFunctions/ValidatorFunctions'


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

  private _myEditorSnackBar : MatSnackBar = inject( MatSnackBar )

  private configurationOfMySnackBar : MatSnackBarConfig<TextOnlySnackBar> = {
      duration: 3000,
  }

  constructor( private myFormBuilder : FormBuilder, private theRouter : Router, private studentsAPI : StudentsAPIService ) {

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
      //this.studentEdited.emit( this.editStudentForm.value )

      this.updatedStudent = { ...this.editStudentForm.getRawValue() }


      //this.editStudentForm.reset()

      //this.showSuccesEdit_SnackBar()
    }

    this.studentsAPI.editStudentInDB( this.updatedStudent ).subscribe(
      {
        next: () => {

          this.showSuccesEdit_SnackBar()

          this.theRouter.navigate( [ RoutingPaths.STUDENTS ] )

        },
        error: (err) => { console.error( 'Error al editar estudiante', err ), this.showNotFounded_SnackBar() }

        
      }
    )

    //this.handleOnReset()

  }

  handleOnReset() {
    this.editStudentForm.reset()
  }


  showSuccesEdit_SnackBar() {
    const message = 'Estudiante editado correctamente'
    const action = 'Cerrar'
    
    this._myEditorSnackBar.open( message, action, this.configurationOfMySnackBar )
  }


  showNotFounded_SnackBar () {

    const messageNotFound = 'Estudiante no encontrado'
    const actionNotFound : string = 'Cerrar'

    this._myEditorSnackBar.open( messageNotFound, actionNotFound, this.configurationOfMySnackBar ) 

  }

}
