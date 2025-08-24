import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Toolbar } from './toolbar/toolbar';
import { Navbar } from './navbar/navbar';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './core/auth/auth-service';


@Component({
  selector: 'app-root',
  imports: [Toolbar, Navbar, CommonModule, RouterModule,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected title = 'angular-coderhouse-project';

  //currentSection : string = 'students-table-section'

  isUserLoggedProp! : boolean

  constructor( private myHttp : HttpClient, private authService : AuthService ) {}


  ngOnInit(): void {

    this.authService.loggedUserEvent$.subscribe( ( userAlreadyLogged ) => {

      this.isUserLoggedProp = ( userAlreadyLogged !== null )  // boolean !==  

      //console.log( "el usuario ya esta loggeado: ", this.isUserLoggedProp)
    } )


  }
  

}
