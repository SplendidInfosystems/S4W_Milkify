import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapbarComponent } from './tapbar.component';

describe('TapbarComponent', () => {
  let component: TapbarComponent;
  let fixture: ComponentFixture<TapbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TapbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TapbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
