import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { userInterface } from '../../../shared/sharedContent/entities';
import { UsersAPIService } from '../../core/users/users-api-service';
import { switchMap } from 'rxjs';
import { CoursesTable } from '../courses-full-component/courses-table/courses-table';
import { CdkNoDataRow } from "@angular/cdk/table";
import { UsersTable } from "./users-table/users-table";
import { MyMatCommonRouterModule } from '../my-mat-common-router/my-mat-common-router-module';
import { MatSnackBarService } from '../../../shared/sharedContent/mat-snack-bar-service';

@Component({
  selector: 'users-render-component',
  imports: [CommonModule, RouterModule, MyMatCommonRouterModule, UsersTable],
  templateUrl: './users-render-component.html',
  styleUrl: './users-render-component.css'
})

export class UsersRenderComponent implements OnInit {

  usersArray! : userInterface[]


  constructor( 
    private usersAPI : UsersAPIService,
    public snackBar : MatSnackBarService 
  ){}


  ngOnInit(): void {
      
    this.usersAPI.getUsersThroughMockIO().subscribe( ( usersFromDB ) => {

      this.usersArray = usersFromDB

    } )

  }


  public handleDeleteUser ( userToDelete : userInterface ) : void {

    this.usersAPI.deleteUserInDB( userToDelete ).pipe(
      

      switchMap( () => this.usersAPI.getUsersThroughMockIO() )

    ).subscribe( ( updatedUsersArray ) => {

      this.usersArray = updatedUsersArray

    } ) 
    
    this.snackBar.showSuccessDelete_SnackBar( 'Usuario', 'Cerrar' )

  }


}
