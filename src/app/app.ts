import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Toolbar } from './toolbar/toolbar';
import { Navbar } from './navbar/navbar';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './core/auth/auth-service';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from './core/authNgRx/auth.selector';
import { FooterComponent } from './features/footer-component/footer-component';


@Component({
  selector: 'app-root',
  imports: [Toolbar, Navbar, CommonModule, RouterModule, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit , AfterViewInit {

  protected title = 'angular-coderhouse-project';

  isUserLoggedProp : boolean = false

  alreadyToFooter : boolean = false

  constructor( private theAuthStore : Store) {}


  ngOnInit() : void {

    this.theAuthStore.select( selectIsLoggedIn ).subscribe( ( loggedInSuccess ) => {

      this.isUserLoggedProp = Boolean(loggedInSuccess)

    } )

  }
  
  ngAfterViewInit() : void {  
    this.alreadyToFooter = true
  }


}
