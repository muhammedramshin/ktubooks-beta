import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskLabelsComponent } from './task-labels.component';

describe('TaskLabelsComponent', () => {
  let component: TaskLabelsComponent;
  let fixture: ComponentFixture<TaskLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskLabelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
