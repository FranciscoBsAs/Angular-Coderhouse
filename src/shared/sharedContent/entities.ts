export interface studentInterface {
    name : string,
    surname : string,
    dni : number,
    age : number,
    average : number,
    courses : string[] ,
    id: number | string
}


export interface courseInterface {
    name : string,
    code : string,
    credits : number,
    fullNamesOfStudentsCoursing : string
    id : number | string
}

/*
export interface singleCourseDetailsI extends courseInterface {

  fullNamesOfStudentsCoursing : string

}
*/

export interface pipeFullNameInterface {
  name : string,
  surname : string
}



export interface userInterface {
  userName : string,
  email : string,
  password : string,
  role : string,
  id : string | number
}


export interface email_password_Interface {
  email : string,
  password : string
}


export type routeMapingType = {

  [ key : string ] : string

}