import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css'
})
export class FooterComponent {


  readonly myPersonalEmail : string = 'franciscotchiressi@gmail.com'

  readonly myPersonalLinkedIn = 'https://www.linkedin.com/in/francisco-thomas-chiressi-8b55b01a0'

  readonly srcLinkedinIcon = 'assets/linkedin.png'


}
