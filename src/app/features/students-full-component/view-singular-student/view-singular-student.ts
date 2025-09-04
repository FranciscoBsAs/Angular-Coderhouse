import { Component } from '@angular/core';
import { studentInterface } from '../../../../shared/sharedContent/entities';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentsTable } from '../students-table/students-table';
import { MatTable, MatTableModule,  } from '@angular/material/table';
import { FullNamePipe } from '../../../../shared/pipes/full-name-pipe';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-view-singular-student',
  imports: [ RouterModule, CommonModule, MatTableModule, FullNamePipe, MatListModule, MatGridListModule ],
  templateUrl: './view-singular-student.html',
  styleUrl: './view-singular-student.css'
})
export class ViewSingularStudent {

  aSingularStudent! : studentInterface | undefined ;

  constructor( private theRouter : Router ) {

    const theNavigation = this.theRouter.getCurrentNavigation();

    this.aSingularStudent = theNavigation?.extras.state?.["studentSelected"]

  }


  columnTitlesSingular : string[] = [ 'FullName', 'DNI', 'Age', 'Average', 'Registered Courses' ]


}
