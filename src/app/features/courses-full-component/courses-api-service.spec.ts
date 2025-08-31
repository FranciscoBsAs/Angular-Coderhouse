import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing'

import { CoursesAPIService } from './courses-api-service';
import { courseInterface } from '../../../shared/sharedContent/entities';
import { RoutingDB } from '../../../enumRoutesDB';

describe('CoursesAPIService', () => {
  
  let service: CoursesAPIService;

  let HTTPmock : HttpTestingController

  const mockSingleCourse : courseInterface = {
    name: "Física",
    code: "FIS103",
    credits: 4,
    id: "00db"
  }

  const baseURLToTesting : string = RoutingDB.EDPOINT_APIio_DB


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [  provideHttpClientTesting ]
    });
    
    service = TestBed.inject(CoursesAPIService);

    HTTPmock = TestBed.inject( HttpTestingController )

  });


  afterEach( () => {
    HTTPmock.verify()   // Verifica que no haya solicitudes pendientes
  } )


  it( 'should delete a course form the API', () => {

    service.deleteCourseInDB( mockSingleCourse ).subscribe( () => {

      expect( true ).toBeTruthy()   // Solo verifica que la llamada se complete

    } )

    const theRequest : TestRequest = HTTPmock.expectOne(`${baseURLToTesting}/${RoutingDB.COURSES}/${mockSingleCourse.id}`)


    expect( theRequest.request.method ).toBe( 'DELETE' )

    theRequest.flush(null)    // Simula una respuesta vacía

  } )


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
