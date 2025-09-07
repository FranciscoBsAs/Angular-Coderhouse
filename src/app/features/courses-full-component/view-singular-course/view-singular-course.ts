import { Component } from '@angular/core';
import { courseInterface, studentInterface } from '../../../../shared/sharedContent/entities';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { State } from '@ngrx/store';
import { StudentsAPIService } from '../../students-full-component/students-api-service';
import { MatSnackBarService } from '../../../../shared/sharedContent/mat-snack-bar-service';

@Component({
  selector: 'app-view-singular-course',
  imports: [ RouterModule, CommonModule, MatTableModule, MatListModule, MatGridListModule  ],
  templateUrl: './view-singular-course.html',
  styleUrl: './view-singular-course.css'
})

export class ViewSingularCourse {

  aSingularCourse! :  courseInterface | undefined ;

  studentsCoursingProp : studentInterface[] = []

  columnTitlesSingular : string[] = [ 'Name', 'Code', 'Credits', 'StudentsCoursing' ]

  constructor( 
    private theRouter : Router ,
    private studentsAPI : StudentsAPIService,
    private snackBar : MatSnackBarService
  ) {

    const theCurrentNavigation = this.theRouter.getCurrentNavigation() ;

    this.aSingularCourse = theCurrentNavigation?.extras.state?.['courseSelectedToView']

    this.studentsCoursingProp = Array.isArray( this.aSingularCourse?.fullNamesOfStudentsCoursing )    
                              ? ( this.aSingularCourse?.fullNamesOfStudentsCoursing as studentInterface[] )
                              : []
  }

 

  public unenrollStudentFromCourse ( certainStudent : studentInterface ) {

    if( !this.aSingularCourse || !certainStudent ) return


    const updatedCourses = certainStudent.courses.filter( 
      ( eachCourse ) => eachCourse !== this.aSingularCourse?.name
    )


    const updatedSingularStudent : studentInterface = {

      ...certainStudent ,
      courses: updatedCourses

    }


    this.studentsAPI.editStudentInDB( updatedSingularStudent ).subscribe(

      {
        next: ( updatedStudent ) => {

          this.studentsCoursingProp = this.studentsCoursingProp.map(

            (eachStudent) => eachStudent.id === updatedStudent.id
                                              ? updatedStudent
                                              : eachStudent
          )


          this.studentsCoursingProp = this.studentsCoursingProp.filter(

            ( newEachStudent ) => newEachStudent.id !== updatedStudent.id

          )

          
          this.snackBar.showSuccessEdit_SnackBar( 'Curso y Estudiante', 'Cerrar' )
        },

        error: () => this.snackBar.showNotFound_SnackBar( 'Estudiante o Curso', 'Cerrar' )
      }

    )

  }

}


/*

Array.isArray()
es un método de JavaScript que verifica si el valor recibido es un array.
Sirve para evitar errores al usar *ngFor, que solo funciona con arrays.

*/