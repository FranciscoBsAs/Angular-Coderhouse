import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { studentInterface } from '../../../shared/sharedContent/entities';
import { HttpClient } from '@angular/common/http';
import { RoutingDB } from '../../../enumRoutesDB';
//import { RoutingPaths } from '../../../shared/urlRoutesEnum';

@Injectable({
  providedIn: 'root'
})

export class StudentsAPIService {

  private baseURL : string = RoutingDB.EDPOINT_APIio_DB

  constructor( private myHTTP : HttpClient ) { }
  

  getStudentsThroughMockIO () : Observable<studentInterface[]> {

    return this.myHTTP.get<studentInterface[]>(`${this.baseURL}/${RoutingDB.STUDENTS}`).pipe( delay(4000) )

  }



  deleteStudentInDB ( someStudent : studentInterface ) : Observable<void> {

    return this.myHTTP.delete<void>(`${this.baseURL}/${RoutingDB.STUDENTS}/${someStudent.id}`).pipe( delay( 2000 ) ) ;

  }
  

  editStudentInDB ( updatedStudent : studentInterface ) : Observable<studentInterface> {

    return( 
      this.myHTTP.put<studentInterface>(
        `${this.baseURL}/${RoutingDB.STUDENTS}/${updatedStudent.id}`,
        updatedStudent
      )
    )

  }


  addStudentInDB ( newStudent : studentInterface ) : Observable<studentInterface> {

    return this.myHTTP.post<studentInterface>( `${this.baseURL}/${RoutingDB.STUDENTS}`, newStudent )

  }  

}
