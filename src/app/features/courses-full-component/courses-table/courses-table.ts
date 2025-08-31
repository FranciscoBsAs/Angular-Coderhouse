import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { courseInterface } from '../../../../shared/sharedContent/entities';
//import { CoursesFullComponent } from '../courses-full-component';
import { RoutingPaths } from '../../../../shared/urlRoutesEnum';
import { MyMatCommonRouterModule } from '../../my-mat-common-router/my-mat-common-router-module';
import { AuthService } from '../../../core/auth/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'courses-table',
  imports: [ MyMatCommonRouterModule, CommonModule ],
  templateUrl: './courses-table.html',
  styleUrl: './courses-table.css'
})


export class CoursesTable implements OnInit {

  @Input() coursesInTable : courseInterface[] = []

  @Output() deleteCourseEventEmitter : EventEmitter<courseInterface> = new EventEmitter<courseInterface>()
  
  
  columnTitles : string[] = [ 'Name', 'Code', 'Credits', 'Actions' ]

  isAdminProp! : boolean

  
  constructor( private theRouter : Router, private authService : AuthService ) {}


  ngOnInit(): void {
      this.isAdminProp = this.authService.isAdmin()
  }

  // nuevo planteo routing edit

  editCourseFromChild ( certainCourse : courseInterface ) : void {

    this.theRouter.navigate( [ `/${RoutingPaths.EDIT_SINGULAR_COURSE}` ] ,
      {
        state:{ courseSelectedToEdit: certainCourse }
      }
    )

  }



  deleteCourseFromChild ( certainCourse : courseInterface ) {

    this.deleteCourseEventEmitter.emit( certainCourse )

  }


  viewDetailSingularCourseFromChild ( certainCourse : courseInterface ) {

    this.theRouter.navigate( [ `/${RoutingPaths.VIEW_SINGULAR_COURSE}` ] ,
      {
        state: { courseSelectedToView: certainCourse }
      }
    )

  }


}
