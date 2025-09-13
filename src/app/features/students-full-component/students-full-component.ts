import { Component, OnInit } from '@angular/core';
import { StudentsAPIService } from './students-api-service';
import { studentInterface } from '../../../shared/sharedContent/entities';
import { CommonModule } from '@angular/common';
import { CdkNoDataRow } from "@angular/cdk/table";
import { StudentsTable } from "./students-table/students-table";
import { RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBarService } from '../../../shared/sharedContent/mat-snack-bar-service';

@Component({
  selector: 'students-full-component',
  imports: [CommonModule, StudentsTable, RouterModule],
  templateUrl: './students-full-component.html',
  styleUrl: './students-full-component.css'
})

export class StudentsFullComponent implements OnInit {

  constructor( private studentsAPI : StudentsAPIService, private snackBar : MatSnackBarService ) {}

  studentsArray! : studentInterface[]

  ngOnInit() : void {
    this.studentsAPI.getStudentsThroughMockIO().subscribe( ( studentsFromDB ) => {

      console.table( studentsFromDB )

      this.studentsArray = studentsFromDB

    } )
  }


  handleDeleteStudent( studentToDelete : studentInterface ) : void {

    this.studentsAPI.deleteStudentInDB( studentToDelete ).pipe(

      switchMap( () : Observable<studentInterface[]> => this.studentsAPI.getStudentsThroughMockIO() )

    ).subscribe( ( updatedStudentsArray ) => {    // ( updatedStudentsArray /* : studentInterface[] inferido */ )
      
      this.studentsArray = updatedStudentsArray

    } )

    this.snackBar.showSuccessDelete_SnackBar( 'Estudiante', 'Cerrar' )

  }

}
 