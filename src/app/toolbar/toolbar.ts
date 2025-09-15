import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BigTitle } from '../../shared/directives/big-title';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../core/authNgRx/auth.selector';
import { routeMapingType } from '../../shared/sharedContent/entities';
import { routeTitleMap, RoutingPaths } from '../../shared/urlRoutesEnum';

@Component({
  selector: 'app-toolbar',
  imports: [ CommonModule, BigTitle, RouterModule ],
  templateUrl: './toolbar.html',
  standalone: true,
  styleUrl: './toolbar.css'
})
export class Toolbar implements OnInit {

  readonly titleApp : string = "My College Web Site"

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
      
      }
       
    } )

  }


  private setTitleRouting () {

    const currentURL : string = this.theRouter.url ;

    const foundComparedRoute = Object.keys( routeTitleMap ).find( ( routingPathKey ) : boolean => (

      currentURL.includes( routingPathKey )

    ) )


    this.titleRouting = foundComparedRoute
                      ? routeTitleMap[ foundComparedRoute ]
                      : ''

  }
  

}

