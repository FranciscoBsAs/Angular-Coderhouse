import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MyMatCommonRouterModule } from '../../my-mat-common-router/my-mat-common-router-module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { courseInterface, studentInterface } from '../../../../shared/sharedContent/entities';
import { averageSup0, firstLetterUpperCaseValidator, onlyLettersValidator } from '../../../../shared/validatorFunctions/ValidatorFunctions';
import { StudentsAPIService } from '../students-api-service';
import { CoursesAPIService } from '../../courses-full-component/courses-api-service';

@Component({
  selector: 'add-student-form',
  imports: [ MyMatCommonRouterModule, ReactiveFormsModule ],
  templateUrl: './add-student-form.html',
  styleUrl: './add-student-form.css'
})
export class AddStudentForm implements OnInit {

  //@Output() studentToAdd : EventEmitter<studentInterface> = new EventEmitter<studentInterface>

  addStudentForm! : FormGroup ;

  private newStudentData! : studentInterface

  public coursesArray : courseInterface[] = []
  
  constructor(
    private myFormBuilder : FormBuilder,
    private studentsAPI : StudentsAPIService,
    private coursesAPI : CoursesAPIService
  
  ) {}

  
  ngOnInit(): void {


    this.coursesAPI.getCoursesThroughMockIO().subscribe(
      {
        next: ( courses ) => {
          this.coursesArray = courses
        }
      }
    )


    this.addStudentForm = this.myFormBuilder.group(
      {
        name: [ '', [ Validators.required, onlyLettersValidator, firstLetterUpperCaseValidator ] ],
        surname: [ '', [ Validators.required, onlyLettersValidator, firstLetterUpperCaseValidator ] ],
        dni: [ '', [  Validators.required, Validators.minLength(7) ] ],
        
        age: [ '', [ Validators.required ] ],
        average: [ '', [ Validators.required, averageSup0, Validators.max(10) ] ],
        courses: [[]],
        id: ['']
      }
    )
    
    
    this.addStudentForm.get( 'dni' )?.valueChanges.subscribe( (dniValue) => {

      this.addStudentForm.get('id')?.setValue( 
        
        dniValue == null || dniValue === ''
                  ? ''
                  : String( dniValue )
        ,
        { emitEvent:false }
      )

    } )
    

  }


  onSubmit () : void {

    /*
    const dniValue : number = this.addStudentForm.get('dni')?.value ;

    this.addStudentForm.get('id')?.setValue(

      dniValue == null
                ? ''
                : String(dniValue) ,

      { emitEvent: false }
    )

    */

    if( !this.addStudentForm.valid ) { 
      return
    }

    this.newStudentData = this.addStudentForm.value ;

    this.studentsAPI.addStudentInDB( this.newStudentData ).subscribe(

      {
        next: ( ) => {
          console.log( 'estudiante creado con exito', this.newStudentData.name, " ", this.newStudentData.surname )
          this.handleOnReset()
        },
        error: ( err ) => {
          console.error( 'Error al añadir estudiante', err )
        }
      }

    )


  }


  handleOnReset () {
    this.addStudentForm.reset()
    this.addStudentForm.get( 'id' )?.setValue( '', { emitEvent: false } )
  }

}
