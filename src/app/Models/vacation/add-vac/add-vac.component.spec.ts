import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacComponent } from './add-vac.component';

describe('AddVacComponent', () => {
  let component: AddVacComponent;
  let fixture: ComponentFixture<AddVacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVacComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
