import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { RouterModule } from '@angular/router';
import { RoutingPaths } from '../../shared/urlRoutesEnum';
import { AuthService } from '../core/auth/auth-service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../core/authNgRx/auth.selector';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  imports: [MatCardModule, RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  public routingPathsInNavBar = RoutingPaths

  public isAdminProp! : boolean
  
  isLoggedIn$! : Observable<boolean>

  constructor( public authService : AuthService, private theStore : Store ) {
    this.isLoggedIn$ = this.theStore.select( selectIsLoggedIn )
  }


  ngOnInit(): void {
    //this.isAdminProp = this.authService.isAdmin()
    //this.isLoggedIn$ = this.theStore.select( selectIsLoggedIn )
  }

  /*
  onLogOutClick ( ev: Event ) {

    ev.preventDefault()

    //this.theStore.dispatch(  )

  }
  */
}
