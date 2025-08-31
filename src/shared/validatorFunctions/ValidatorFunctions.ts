import { AbstractControl, ValidationErrors } from "@angular/forms";

export function averageSup0 ( control : AbstractControl ) : ValidationErrors | null {
  const value : number = parseFloat(control.value)
  return (
    !isNaN( value ) && value > 0
      ? null 
      : { nullAverage: true }
  )
}


export function onlyLettersValidator ( control : AbstractControl ) : ValidationErrors | null {

  const word : string = control.value
  if( !word ) { return null }

  const lettersOnlyRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/ ;

  return (
    lettersOnlyRegex.test( word )
      ? null
      : { onlyLetters: true }
  )

}


export function firstLetterUpperCaseValidator ( control : AbstractControl ) : ValidationErrors | null {

  const theNameOrSurname : string = control.value ;

  if( !theNameOrSurname ) { 
    return null 
  }

  const firstLetter : string = theNameOrSurname.trim().charAt( 0 ) ;

  return(
    
    firstLetter === firstLetter.toUpperCase()
                  ? null
                  : { firstLetterIsNotUpperCase : true }

  )

}


export function notEmoticonValidator ( control : AbstractControl ) : ValidationErrors | null {

  const value : string = control.value

  if( !value ) return null

  const emoticonRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

  return(

    emoticonRegex.test( value ) 
      ? { hasEmoticon: true } 
      : null

  )

}

//export default averageSup0
//export default onlyLettersValidator