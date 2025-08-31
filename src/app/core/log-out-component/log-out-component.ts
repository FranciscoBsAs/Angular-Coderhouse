import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AuthActions from '../authNgRx/auth.actions'
import { RoutingPaths } from '../../../shared/urlRoutesEnum';

@Component({
  selector: 'app-log-out-component',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './log-out-component.html',
  styleUrl: './log-out-component.css'
})
export class LogOutComponent implements OnInit {


  private theStore = inject(Store)

  private theRouter = inject( Router )


  ngOnInit(): void {
      
      this.theStore.dispatch( AuthActions.LogOut() )

            
    setTimeout( () => {

      this.theRouter.navigate([ RoutingPaths.HOME ])

     }, 1500 )
     
      //this.theRouter.navigate( [ RoutingPaths.HOME ] )
  }

}
