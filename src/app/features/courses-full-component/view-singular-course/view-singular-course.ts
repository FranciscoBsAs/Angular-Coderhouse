import { Component } from '@angular/core';
import { courseInterface, studentInterface } from '../../../../shared/sharedContent/entities';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { State } from '@ngrx/store';

@Component({
  selector: 'app-view-singular-course',
  imports: [ RouterModule, CommonModule, MatTableModule, MatListModule, MatGridListModule  ],
  templateUrl: './view-singular-course.html',
  styleUrl: './view-singular-course.css'
})

export class ViewSingularCourse {

  aSingularCourse! :  courseInterface | undefined ;

  studentsCoursingProp : studentInterface[] = []

  constructor( private theRouter : Router ) {

    const theCurrentNavigation = this.theRouter.getCurrentNavigation() ;

    this.aSingularCourse = theCurrentNavigation?.extras.state?.['courseSelectedToView']

    this.studentsCoursingProp = Array.isArray( this.aSingularCourse?.fullNamesOfStudentsCoursing )    
                              ? ( this.aSingularCourse?.fullNamesOfStudentsCoursing as studentInterface[] )
                              : []
  }


  columnTitlesSingular : string[] = [ 'Name', 'Code', 'Credits', 'StudentsCoursing' ]

}


/*

Array.isArray()
es un método de JavaScript que verifica si el valor recibido es un array.
Sirve para evitar errores al usar *ngFor, que solo funciona con arrays.

*/