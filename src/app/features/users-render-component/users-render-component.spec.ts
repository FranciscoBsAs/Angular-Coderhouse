import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRenderComponent } from './users-render-component';

describe('UsersRenderComponent', () => {
  let component: UsersRenderComponent;
  let fixture: ComponentFixture<UsersRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersRenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
