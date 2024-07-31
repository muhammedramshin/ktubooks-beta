import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCopyComponent } from './quick-copy.component';

describe('QuickCopyComponent', () => {
  let component: QuickCopyComponent;
  let fixture: ComponentFixture<QuickCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
