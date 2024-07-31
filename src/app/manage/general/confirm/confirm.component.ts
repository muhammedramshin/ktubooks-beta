import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmComponent>,@Inject(MAT_DIALOG_DATA)public data:any) { }

  ngOnInit(): void {
  }

  action() {

    switch (this.data.type) {
      case 'taskfiledelete':
        this.dialogRef.close(true);
        break;
      case 'true':
        this.dialogRef.close(true);
        break;

     
        default:
          break;
    }
  }

  
  cancel() {
    this.dialogRef.close(false);
  }
}
