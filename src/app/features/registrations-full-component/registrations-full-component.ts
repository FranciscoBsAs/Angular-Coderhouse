import { Component, OnInit } from '@angular/core';
import { MyMatCommonRouterModule } from '../my-mat-common-router/my-mat-common-router-module';
import { RoutingPaths } from '../../../shared/urlRoutesEnum';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddStudentForm } from "../students-full-component/add-student-form/add-student-form";


@Component({
  selector: 'app-registrations-full-component',
  imports: [MyMatCommonRouterModule, RouterModule, CommonModule, AddStudentForm],
  templateUrl: './registrations-full-component.html',
  styleUrl: './registrations-full-component.css'
})
export class RegistrationsFullComponent  {

  constructor() {}

  public routingPathsInRegistrations = RoutingPaths

}
