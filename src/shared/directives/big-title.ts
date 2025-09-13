import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[BigTitleDirective]'
})
export class BigTitle {

  constructor( private theElement : ElementRef, private theRenderer : Renderer2 ) { }


  ngOnInit() {
    
    this.theRenderer.setStyle(
      this.theElement.nativeElement,
      'font-size',
      '40px',
    )
    this.theRenderer.setStyle(
      this.theElement.nativeElement,
      'text-align',
      'center',
    )

  }

}
