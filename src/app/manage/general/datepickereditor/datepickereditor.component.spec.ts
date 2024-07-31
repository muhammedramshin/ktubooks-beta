import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickereditorComponent } from './datepickereditor.component';

describe('DatepickereditorComponent', () => {
  let component: DatepickereditorComponent;
  let fixture: ComponentFixture<DatepickereditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickereditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickereditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
