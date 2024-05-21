import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdSubsComponent } from './prod-subs.component';

describe('ProdSubsComponent', () => {
  let component: ProdSubsComponent;
  let fixture: ComponentFixture<ProdSubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdSubsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdSubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
