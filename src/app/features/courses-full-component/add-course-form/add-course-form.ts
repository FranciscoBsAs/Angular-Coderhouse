import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { courseInterface } from '../../../../shared/sharedContent/entities';
import { CoursesAPIService } from '../courses-api-service';
import { MyMatCommonRouterModule } from '../../my-mat-common-router/my-mat-common-router-module';

@Component({
  selector: 'add-course-form',
  imports: [ MyMatCommonRouterModule, ReactiveFormsModule ],
  templateUrl: './add-course-form.html',
  styleUrl: './add-course-form.css'
})
export class AddCourseForm implements OnInit {

  addCourseForm! : FormGroup ;

  private newCourseData! : courseInterface

  constructor(
    private myFormBuilder : FormBuilder,
    private coursesAPI : CoursesAPIService
  ){}


  ngOnInit(): void {
      this.addCourseForm = this.myFormBuilder.group(
        {
          name: ['', [] ],
          code: ['', [] ],
          credits: ['', [] ],
          id: ['', [] ]
        }
      )

  }

  onSubmit () : Error |void {
    
    if( !this.addCourseForm.valid ){
      return new Error
    }

    this.newCourseData = this.addCourseForm.value ;

    this.coursesAPI.addCourseInDB( this.newCourseData ).subscribe(

      {
        next: () => {
          console.log( 'Curso creado con exito', this.newCourseData.name )
          this.handleOnReset()
        }
      }

    )

  }

  public handleOnReset() {
    this.addCourseForm.reset()
  }

}
