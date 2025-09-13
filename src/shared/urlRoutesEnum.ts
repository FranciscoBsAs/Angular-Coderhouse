import { routeMapingType } from "./sharedContent/entities";

export enum RoutingPaths {

    HOME = '',
    HOME_WITH_BAR = '/',
    USERS = 'usuarios',
    STUDENTS = 'estudiantes',
    COURSES = 'cursos',
    REGISTRATIONS= 'inscripciones',
    
    VIEW_SINGULAR_STUDENT = 'ver-estudiante',
    EDIT_SINGULAR_STUDENT = 'editar-estudiante',
    ADD_NEW_STUDENT = 'añadir-estudiante',

    EDIT_SINGULAR_COURSE = 'editar-curso',
    VIEW_SINGULAR_COURSE = 'ver-curso',
    ADD_NEW_COURSE = 'añadir-curso',

    VIEW_SINGULAR_USER = 'ver-usuario',
    EDIT_SINGULAR_USER = 'editar-usuario',

    LOG_OUT = 'logout',
    
    NOT_FOUND_ROUTE = '**',
   
}


export const routeTitleMap : routeMapingType = {

    [ RoutingPaths.STUDENTS ]: "students-full-component",
    
    [ RoutingPaths.VIEW_SINGULAR_STUDENT ]: "view-singular-student",

    [ RoutingPaths.EDIT_SINGULAR_STUDENT ]: "edit-student-form",

    [ RoutingPaths.REGISTRATIONS ]: "registrations-full-component",

    [ RoutingPaths.COURSES ]: "courses-full-component",

    [ RoutingPaths.VIEW_SINGULAR_COURSE ]: "view-singular-course",

    [ RoutingPaths.EDIT_SINGULAR_COURSE ]: "edit-course-form",

    [ RoutingPaths.USERS ]: 'users-full-component' ,

    [ RoutingPaths.VIEW_SINGULAR_USER ]: "view-singular-user" ,

    [ RoutingPaths.EDIT_SINGULAR_USER ]: "edit-user-form",
    
    [ RoutingPaths.NOT_FOUND_ROUTE ]: "not-found-component"

}