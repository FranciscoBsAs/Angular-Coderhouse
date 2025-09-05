import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingularUser } from './view-singular-user';

describe('ViewSingularUser', () => {
  let component: ViewSingularUser;
  let fixture: ComponentFixture<ViewSingularUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSingularUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSingularUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
