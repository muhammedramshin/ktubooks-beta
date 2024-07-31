import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickercustomComponent } from './datepickercustom.component';

describe('DatepickercustomComponent', () => {
  let component: DatepickercustomComponent;
  let fixture: ComponentFixture<DatepickercustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickercustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickercustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
