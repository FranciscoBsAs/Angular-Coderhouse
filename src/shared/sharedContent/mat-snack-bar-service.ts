import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, TextOnlySnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

export class MatSnackBarService {

  public configurationOfSnackBar : MatSnackBarConfig<TextOnlySnackBar> = {

    duration: 4000

  }

  constructor( public sharedEditorSnackBar : MatSnackBar ) { }


  showSuccessEdit_SnackBar ( element : string, action : string ) {

    const messageEditSucces =  `${element} editado correctamente`

    const actionName = action

    this.sharedEditorSnackBar.open( messageEditSucces, actionName, this.configurationOfSnackBar )

  }


  showNotFound_SnackBar ( element : string , action : string ) {

    const messageNotFound = `${element} no encontrado`

    const actionNotFoundName : string = action

    
    this.sharedEditorSnackBar.open( messageNotFound, actionNotFoundName, this.configurationOfSnackBar )

  }


  showSuccessAdd_SnackBar ( element : string, action : string ) {

    const messageAddSuccess = `${element} añadido con exito`

    const actionName = action

    this.sharedEditorSnackBar.open( messageAddSuccess, actionName, this.configurationOfSnackBar )

  }


  showSuccessDelete_SnackBar ( element : string, action : string ) {

    const messageDeleteSuccess = `${element} ya eliminado con exito`

    this.sharedEditorSnackBar.open( messageDeleteSuccess, action, this.configurationOfSnackBar )

  }

}
