import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RoutingPaths } from '../../../shared/urlRoutesEnum';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'anot-found-component',
  standalone:true,
  imports: [ RouterModule, CommonModule, RouterModule ],
  templateUrl: './not-found-component.html',
  styleUrl: './not-found-component.css'
})
export class NotFoundComponent implements OnInit {

  public routeToStudentsTable = RoutingPaths.STUDENTS

  constructor( private theRouter : Router ) {}

  ngOnInit() : void {
      
    setTimeout( () => {

      this.theRouter.navigate([ RoutingPaths.STUDENTS ])

    }, 3500 )

  }

}
