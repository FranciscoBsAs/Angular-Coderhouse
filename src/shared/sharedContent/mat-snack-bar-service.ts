import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, TextOnlySnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

export class MatSnackBarService {

  //private sharedSnackBar

  public configurationOfSnackBar : MatSnackBarConfig<TextOnlySnackBar> = {

    duration: 3000

  }

  constructor( public sharedEditorSnackBar : MatSnackBar ) { }


  showSuccessEdit_SnackBar ( element : string, action : string ) {

    let messageEditSucces =  `${element} editado correctamente`

    let actionName = action

    //let sharedEditorSnackBar : MatSnackBar = inject(MatSnackBar)

    this.sharedEditorSnackBar.open( messageEditSucces, actionName, this.configurationOfSnackBar )

  }


  showNotFound_SnackBar ( element : string , action : string ) {

    let messageNotFound = `${element} no encontrado`

    let actionNotFoundName : string = action

    
    this.sharedEditorSnackBar.open( messageNotFound, actionNotFoundName, this.configurationOfSnackBar )

  }

}
