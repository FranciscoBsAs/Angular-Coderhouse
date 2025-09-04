import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Toolbar } from './toolbar/toolbar';
import { Navbar } from './navbar/navbar';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './core/auth/auth-service';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from './core/authNgRx/auth.selector';


@Component({
  selector: 'app-root',
  imports: [Toolbar, Navbar, CommonModule, RouterModule,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected title = 'angular-coderhouse-project';

  //currentSection : string = 'students-table-section'

  isUserLoggedProp : boolean = false

  constructor( 
    private myHttp : HttpClient,

    public cdRef : ChangeDetectorRef,

    private theAuthStore : Store
   
  ) {}


  ngOnInit(): void {

    this.theAuthStore.select( selectIsLoggedIn ).subscribe( ( loggedInSuccess ) => {

      this.isUserLoggedProp = Boolean(loggedInSuccess)

      //this.cdRef.detectChanges()

    } )


  }

  public getNavBarTitle () : string {

    return  'Titulo tal FALTA LOGICA'
  }
  

}
