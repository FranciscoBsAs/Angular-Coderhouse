export interface studentInterface {
    name : string,
    surname : string,
    dni : number,
    age : number,
    average : number,
    id: number | string
}


export interface courseInterface {
    name : string,
    code : string,
    credits : number,
    id : number | string
}

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