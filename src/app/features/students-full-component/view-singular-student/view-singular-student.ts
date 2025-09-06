import { Component, OnInit } from '@angular/core';
import { studentInterface } from '../../../../shared/sharedContent/entities';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentsTable } from '../students-table/students-table';
import { MatTable, MatTableModule,  } from '@angular/material/table';
import { FullNamePipe } from '../../../../shared/pipes/full-name-pipe';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { StudentsAPIService } from '../students-api-service';
import { MyMatCommonRouterModule } from '../../my-mat-common-router/my-mat-common-router-module';


@Component({
  selector: 'app-view-singular-student',
  imports: [ MyMatCommonRouterModule ,RouterModule, CommonModule, MatTableModule, FullNamePipe, MatListModule, MatGridListModule ],
  templateUrl: './view-singular-student.html',
  styleUrl: './view-singular-student.css'
})
export class ViewSingularStudent  {

  aSingularStudent! : studentInterface | undefined ;

  constructor( 
    private theRouter : Router ,
    private studentsService : StudentsAPIService
  ) {

    const theNavigation = this.theRouter.getCurrentNavigation();

    this.aSingularStudent = theNavigation?.extras.state?.["studentSelected"]

  }



  public UnenrollFromCourse ( certainAttributedCourse : string ) {

    if( !this.aSingularStudent ) return


    const updatedCourses = this.aSingularStudent.courses.filter(
      (eachCourse) => eachCourse !== certainAttributedCourse
    )


    const updatedSingularStudent : studentInterface = {
      ...this.aSingularStudent,
      courses: updatedCourses
    }


    this.studentsService.editStudentInDB( updatedSingularStudent ).subscribe(

      {
        next: ( student ) => {
          this.aSingularStudent = student
        },
        error: (err) => {
          console.error( 'Error al desinscribir', err )
        }
      }

    )

  }

  columnTitlesSingular : string[] = [ 'FullName', 'DNI', 'Age', 'Average', 'Registered Courses' ]

}
