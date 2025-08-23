import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BigTitle } from '../../shared/directives/big-title';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [ CommonModule, BigTitle ],
  templateUrl: './toolbar.html',
  standalone: true,
  styleUrl: './toolbar.css'
})
export class Toolbar implements OnInit {

  readonly titleApp : string = "College App"

  titleRouting! : string

  ngOnInit(): void { // comentar
      
  }

  /*
  constructor( private theRouter : Router, private activatedRoute : ActivatedRoute ) {}

  ngOnInit(): void {

    this.theRouter.events.subscribe( () => {
      const currentRoute = this.activatedRoute.snapshot.firstChild?.routeConfig?.path
      //this.titleRouting = this
    } )
      
  }

  */
}
