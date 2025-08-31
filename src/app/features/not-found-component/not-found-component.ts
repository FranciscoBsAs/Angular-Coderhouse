import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RoutingPaths } from '../../../shared/urlRoutesEnum';

@Component({
  selector: 'anot-found-component',
  standalone:true,
  imports: [ RouterModule ],
  templateUrl: './not-found-component.html',
  styleUrl: './not-found-component.css'
})
export class NotFoundComponent implements OnInit {

  constructor( private theRouter : Router ) {}

  ngOnInit() : void {
      
    setTimeout( () => {

      this.theRouter.navigate([ RoutingPaths.HOME ])

    }, 1500 )

  }

}
