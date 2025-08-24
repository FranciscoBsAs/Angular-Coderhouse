import { Routes } from '@angular/router';
import { RoutingPaths } from '../shared/urlRoutesEnum';
import { StudentsFullComponent } from './features/students-full-component/students-full-component';
import { LoginFormComponent } from './core/loginForm/login-form-component';
import { RoleGuard } from './core/guards/role-guard';


export const routes : Routes = [

    {
        path: RoutingPaths.HOME,
        component: LoginFormComponent,
        /*

        */
    },
    {
        path: RoutingPaths.STUDENTS,
        loadComponent: function () { 
            return(
                import( './features/students-full-component/students-full-component')
                    .then(
                        function( module ) {
                            return module.StudentsFullComponent
                        }
                    )
            )
        }
    },

    {
        path: RoutingPaths.REGISTRATIONS,
        canActivate: [ RoleGuard ],
        loadComponent: () => import( './features/registrations-full-component/registrations-full-component' ).then( (module) => module.RegistrationsFullComponent )
    },
    {
        path: RoutingPaths.VIEW_SINGULAR_STUDENT,
        //component: ViewSingularStudent
        loadComponent: () => import( './features/students-full-component/view-singular-student/view-singular-student').then( (module) => module.ViewSingularStudent )
    },
    {
        path: RoutingPaths.EDIT_SINGULAR_STUDENT,
        canActivate: [RoleGuard],
        loadComponent: () => import( './features/students-full-component/edit-student-form/edit-student-form' ).then( (module) => module.EditStudentForm )
    },

    {
        path: RoutingPaths.COURSES ,
        loadComponent: () => import( './features/courses-full-component/courses-full-component').then( ( module ) => module.CoursesFullComponent )
    },
    {
        path: RoutingPaths.EDIT_SINGULAR_COURSE,
        canActivate: [ RoleGuard ],
        loadComponent: () => import( './features/courses-full-component/edit-courses-form/edit-courses-form' ).then( (module) => module.EditCoursesForm )
    },
    {
        path: RoutingPaths.VIEW_SINGULAR_COURSE,
        loadComponent: () => import( './features/courses-full-component/view-singular-course/view-singular-course' ).then( ( module ) => module.ViewSingularCourse )
    },

    

    {
        path: "**",
        //component: NotFoundComponent
        loadComponent: () => import( './features/not-found-component/not-found-component' ).then( ( module ) => module.NotFoundComponent )
    }
];
