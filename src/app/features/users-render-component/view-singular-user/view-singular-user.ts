import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { userInterface } from '../../../../shared/sharedContent/entities';

@Component({
  selector: 'view-singular-user',
  imports: [ RouterModule, CommonModule, MatTableModule, MatListModule, MatGridListModule ],
  templateUrl: './view-singular-user.html',
  styleUrl: './view-singular-user.css'
})

export class ViewSingularUser {

  aSingularUser! : userInterface | undefined

  columnTitlesSingular : string[] = [ 'Name', 'Email', 'Role']

  constructor( private theRouter : Router ){

    const theCurrentNavigation = this.theRouter.getCurrentNavigation()


    this.aSingularUser =  theCurrentNavigation?.extras.state?.['userSelectedToView']

  }



}
