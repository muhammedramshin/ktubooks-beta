import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsEditorComponent } from './documents-editor.component';

describe('DocumentsEditorComponent', () => {
  let component: DocumentsEditorComponent;
  let fixture: ComponentFixture<DocumentsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
