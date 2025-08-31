import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { courseInterface } from '../../../shared/sharedContent/entities';
import { RoutingDB } from '../../../enumRoutesDB';

@Injectable({
  providedIn: 'root'
})

export class CoursesAPIService {

  private baseURL : string = RoutingDB.EDPOINT_APIio_DB

  constructor( private myHttp : HttpClient ) { }


  public getCoursesThroughMockIO () : Observable< courseInterface[] > {

    return this.myHttp.get< courseInterface[] >( `${this.baseURL}/${RoutingDB.COURSES}` ).pipe( delay(4000) )

  }


  editStudentInDB ( updatedCourse : courseInterface ) : Observable<courseInterface> {

    return(
      this.myHttp.put<courseInterface>(`${this.baseURL}/${RoutingDB.COURSES}/${updatedCourse.id}` ,
        updatedCourse
      )
    )

  } 


  deleteCourseInDB ( someCourse : courseInterface ) : Observable<void> {

    return this.myHttp.delete<void>( `${this.baseURL}/${RoutingDB.COURSES}/${someCourse.id}` ).pipe(delay(2000))

  }


  addCourseInDB ( newCourse : courseInterface ) : Observable<courseInterface> {

    return this.myHttp.post<courseInterface>( `${this.baseURL}/${RoutingDB.COURSES}`, newCourse )
    
  }

}
