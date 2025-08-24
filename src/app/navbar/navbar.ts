import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { RouterModule } from '@angular/router';
import { RoutingPaths } from '../../shared/urlRoutesEnum';
import { AuthService } from '../core/auth/auth-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [MatCardModule, RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  public routingPathsInNavBar = RoutingPaths

  public isAdminProp! : boolean

  constructor( public authService : AuthService ) {}


  ngOnInit(): void {
    this.isAdminProp = this.authService.isAdmin()

  }

}
