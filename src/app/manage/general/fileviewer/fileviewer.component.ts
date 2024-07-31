import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fileviewer',
  templateUrl: './fileviewer.component.html',
  styleUrls: ['./fileviewer.component.scss']
})
export class FileviewerComponent implements OnInit {

  constructor(private ref:MatDialogRef<FileviewerComponent>,@Inject(MAT_DIALOG_DATA)public data:any) { }

  ngOnInit(): void {
  }


  close(){
    this.ref.close();
  }

}
