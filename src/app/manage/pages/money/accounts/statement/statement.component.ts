import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {

  constructor(private ref:MatDialogRef<StatementComponent>,@Inject(MAT_DIALOG_DATA)public data:any,private afs:AngularFirestore) { }

  statements:any;
  ngOnInit(): void {
    console.log(this.data);
    this.getStatements();
  }

  getStatements() {
    this.afs.collection('accounts').doc(this.data.id).collection('statements',(ref:any) => ref.orderBy('createdAt','desc')).valueChanges().subscribe((res:any) => {
      console.log(res);
      this.statements = res;
    }
    )

  }

}
