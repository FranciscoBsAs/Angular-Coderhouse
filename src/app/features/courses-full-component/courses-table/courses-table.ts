import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { courseInterface, studentInterface } from '../../../../shared/sharedContent/entities';
//import { CoursesFullComponent } from '../courses-full-component';
import { RoutingPaths } from '../../../../shared/urlRoutesEnum';
import { MyMatCommonRouterModule } from '../../my-mat-common-router/my-mat-common-router-module';
import { AuthService } from '../../../core/auth/auth-service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from '../../../core/authNgRx/auth.selector';
import { StudentsAPIService } from '../../students-full-component/students-api-service';

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

  studentsArrayToDetails! : studentInterface[]

  
  constructor( 
    private theRouter : Router,
    private authService : AuthService ,
    private theAuthStore : Store,
    private studentsAPI : StudentsAPIService
  ) {}


  ngOnInit(): void {
      
    this.theAuthStore.select( selectIsAdmin ).subscribe( ( isAdmin ) => {

      this.isAdminProp = Boolean(isAdmin)

    })

    this.studentsAPI.getStudentsThroughMockIO().subscribe( ( studentsFromDB ) => {

      this.studentsArrayToDetails = studentsFromDB

    } )

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

    // Filtrar los estudiantes que cursan el curso seleccionado

    const studentsCoursing : studentInterface[] = this.studentsArrayToDetails.filter( ( student ) : boolean => (

      Array.isArray(student.courses) && student.courses.includes( certainCourse.name )

    ) )

    const fullNamesOfStudentsCoursing = studentsCoursing.map(

      (student) : string => `${student.name} ${student.surname}`

    ).join( ' | ' )


    this.theRouter.navigate( [ `/${RoutingPaths.VIEW_SINGULAR_COURSE}` ] ,
      {
        state: { 
          courseSelectedToView: {

            ...certainCourse,
            fullNamesOfStudentsCoursing : studentsCoursing

          }
        }
      }
    )

  }


}
