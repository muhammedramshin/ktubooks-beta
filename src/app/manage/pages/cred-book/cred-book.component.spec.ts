import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredBookComponent } from './cred-book.component';

describe('CredBookComponent', () => {
  let component: CredBookComponent;
  let fixture: ComponentFixture<CredBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
