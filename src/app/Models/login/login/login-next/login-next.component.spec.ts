import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNextComponent } from './login-next.component';

describe('LoginNextComponent', () => {
  let component: LoginNextComponent;
  let fixture: ComponentFixture<LoginNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginNextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
