import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilegalleryComponent } from './filegallery.component';

describe('FilegalleryComponent', () => {
  let component: FilegalleryComponent;
  let fixture: ComponentFixture<FilegalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilegalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilegalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
