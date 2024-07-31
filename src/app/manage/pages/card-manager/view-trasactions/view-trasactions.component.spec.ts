import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrasactionsComponent } from './view-trasactions.component';

describe('ViewTrasactionsComponent', () => {
  let component: ViewTrasactionsComponent;
  let fixture: ComponentFixture<ViewTrasactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTrasactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTrasactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
