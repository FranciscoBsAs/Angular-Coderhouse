import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
//import { StudentsTable } from '../students-full-component/students-table/students-table';
import { Router, RouterModule } from '@angular/router';
import { CoursesAPIService } from './courses-api-service';
import { courseInterface } from '../../../shared/sharedContent/entities';
import { CoursesTable } from './courses-table/courses-table';
import { switchMap } from 'rxjs';
import { MatSnackBarService } from '../../../shared/sharedContent/mat-snack-bar-service';

@Component({
  selector: 'app-courses-full-component',
  imports: [CommonModule, CoursesTable, RouterModule],
  templateUrl: './courses-full-component.html',
  styleUrl: './courses-full-component.css'
})

export class CoursesFullComponent implements OnInit {

  coursesArray! : courseInterface[]


  constructor(
    private courseAPI : CoursesAPIService,
    private snackBar : MatSnackBarService
  ){}

  
  ngOnInit() : void {
      
    this.courseAPI.getCoursesThroughMockIO().subscribe( ( coursesFromDB ) => {      // coursesFromDB infiere desde el generic <courseInterface[]> su type de parametro callback a esperar

      this.coursesArray = coursesFromDB

    } )

  }


  handleDeleteCourse ( courseToDelete : courseInterface ) : void {

    this.courseAPI.deleteCourseInDB( courseToDelete ).pipe(

      switchMap( () => this.courseAPI.getCoursesThroughMockIO() )

    ).subscribe( ( updatedCoursesArray ) => {

      this.coursesArray = updatedCoursesArray

    } )

    this.snackBar.showSuccessDelete_SnackBar('Curso', 'Cerrar')

  }

}
