import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { MyMatCommonRouterModule } from '../../my-mat-common-router/my-mat-common-router-module';
import { userInterface } from '../../../../shared/sharedContent/entities';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UsersAPIService } from '../../../core/users/users-api-service';
import { selectIsAdmin } from '../../../core/authNgRx/auth.selector';
import { RoutingPaths } from '../../../../shared/urlRoutesEnum';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'users-table',
  imports: [ MyMatCommonRouterModule, CommonModule, MatTableModule ],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css'
})

export class UsersTable implements OnInit {

  @Input() usersInTable : userInterface[] = []

  @Output() deleteUserEventEmitter : EventEmitter<userInterface> = new EventEmitter<userInterface>()


  columnTitles : string[] = [ 'Name', 'Email', 'Role', 'Actions' ]

  isAdminProp! : boolean

  usersArrayToDetails! : userInterface[]


  constructor( 
    private theRouter : Router,

    private theAuthStore : Store,

    private usersAPI : UsersAPIService

  ){}


  ngOnInit(): void {
      
    this.theAuthStore.select( selectIsAdmin ).subscribe( ( isAdmin ) => {

      this.isAdminProp = isAdmin  //Boolean(isAdmin)

    } )

  }


  editUserFromChild ( certainUser : userInterface ) : void {

    this.theRouter.navigate( 
      [ `/${RoutingPaths.EDIT_SINGULAR_USER}` ] ,
      {
        state: { userSelectedToEdit: certainUser }
      }
    ) 
  }


  viewDetailSingularUserFromChild ( certainUser : userInterface ) {

    this.theRouter.navigate( [ `/${RoutingPaths.VIEW_SINGULAR_USER}` ] ,

      {
        state: { userSelectedToView: certainUser }
      }

    )

  }


  deleteUserFromChild ( certainUser : userInterface ) {

    this.deleteUserEventEmitter.emit( certainUser )

  }


}
