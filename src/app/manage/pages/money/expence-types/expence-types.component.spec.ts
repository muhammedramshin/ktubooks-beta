import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenceTypesComponent } from './expence-types.component';

describe('ExpenceTypesComponent', () => {
  let component: ExpenceTypesComponent;
  let fixture: ComponentFixture<ExpenceTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenceTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
