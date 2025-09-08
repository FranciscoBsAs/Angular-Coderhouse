import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'

import { Navbar } from './navbar';
import { RoutingPaths } from '../../shared/urlRoutesEnum';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it( 'should have routingPath property good defined', () => {

    const routingProperty = component.routingPathsInNavBar


    expect( routingProperty ).toBeDefined()

    expect( routingProperty ).toEqual( RoutingPaths )

  } )


  it( 'should render 3 routes as links', () => {

    const compiled = fixture.nativeElement as HTMLElement ;

    const links = compiled.querySelectorAll( 'a' )

    
    expect( links.length ).toBe(5)

  } )

});
