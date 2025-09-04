import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
//import { StudentsTable } from '../students-full-component/students-table/students-table';
import { Router, RouterModule } from '@angular/router';
import { CoursesAPIService } from './courses-api-service';
import { courseInterface } from '../../../shared/sharedContent/entities';
import { CoursesTable } from './courses-table/courses-table';
import { switchMap } from 'rxjs';

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
    private theRouter : Router

  ){}

  
  ngOnInit() : void {
      
    this.courseAPI.getCoursesThroughMockIO().subscribe( ( coursesFromDB ) => {      // coursesFromDB infiere desde el generic <courseInterface[]> su type de parametro callback a esperar

      console.table( coursesFromDB ) ;

      this.coursesArray = coursesFromDB

    } )

  }


  handleDeleteCourse ( courseToDelete : courseInterface ) : void {

    console.log( "Eliminando curso", courseToDelete )

    this.courseAPI.deleteCourseInDB( courseToDelete ).pipe(

      switchMap( () => this.courseAPI.getCoursesThroughMockIO() )

    ).subscribe( ( updatedCoursesArray ) => {

      this.coursesArray = updatedCoursesArray

    } )

  }

}
