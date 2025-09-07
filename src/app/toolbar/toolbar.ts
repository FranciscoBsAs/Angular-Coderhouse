import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BigTitle } from '../../shared/directives/big-title';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../core/authNgRx/auth.selector';
import { routeMapingType } from '../../shared/sharedContent/entities';
import { RoutingPaths } from '../../shared/urlRoutesEnum';

@Component({
  selector: 'app-toolbar',
  imports: [ CommonModule, BigTitle, RouterModule ],
  templateUrl: './toolbar.html',
  standalone: true,
  styleUrl: './toolbar.css'
})
export class Toolbar implements OnInit {


  readonly titleApp : string = "College App"

  titleRouting! : string

  public userNameTitle! : string | null

  constructor( private theAuthStore : Store, private theRouter : Router ) {}


  ngOnInit(): void { 
    
    this.theAuthStore.select( selectUser ).subscribe( ( userSelected ) => {

      userSelected == undefined
                    ? this.userNameTitle = null
                    : ( this.userNameTitle = userSelected?.userName )
                    
    } )
                  

    this.theRouter.events.subscribe( ( event ) => {

      if ( event instanceof NavigationEnd ) { 
        
        this.setTitleRouting()
      
        console.log( 'ruta actual', this.titleRouting )
      }
       
    } )

  }


  private readonly routeTitleMap : routeMapingType = {

    [ RoutingPaths.STUDENTS ]: "students-full-component",
    
    [ RoutingPaths.VIEW_SINGULAR_STUDENT ]: "view-singular-student",

    [ RoutingPaths.EDIT_SINGULAR_STUDENT ]: "edit-student-form",

    [ RoutingPaths.REGISTRATIONS ]: "registrations-full-component",

    [ RoutingPaths.COURSES ]: "courses-full-component",

    [ RoutingPaths.VIEW_SINGULAR_COURSE ]: "view-singular-course",

    [ RoutingPaths.EDIT_SINGULAR_COURSE ]: "edit-course-form",

    [ RoutingPaths.USERS ]: 'users-full-component' ,

    [ RoutingPaths.VIEW_SINGULAR_USER ]: "view-singular-user" ,

    [ RoutingPaths.EDIT_SINGULAR_USER ]: "edit-user-form",
    
    [ RoutingPaths.NOT_FOUND_ROUTE ]: "not-found-component"

  }


  private setTitleRouting () {

    const currentURL : string = this.theRouter.url ;

    const foundComparedRoute = Object.keys( this.routeTitleMap ).find( ( routingPathKey ) => (

      currentURL.includes( routingPathKey )

    ) )


    this.titleRouting = foundComparedRoute
                      ? this.routeTitleMap[ foundComparedRoute ]
                      : ''

  }


}

