import { ElementRef, Renderer2 } from '@angular/core';
import { BigTitle } from './big-title';

describe('BigTitle', () => {
  it('should create an instance', () => {

    // MOCKS para evitar tipados de any
    const theElementRef : ElementRef = new ElementRef( document.createElement('h1') )
    const theRenderer : Renderer2 = {} as Renderer2

    const directive = new BigTitle( theElementRef, theRenderer );


    expect(directive).toBeTruthy();
  });
});
