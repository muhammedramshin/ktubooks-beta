import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(private ref:MatDialogRef<UpdateComponent>,@Inject(MAT_DIALOG_DATA)public data:any,private afs:AngularFirestore) { }
  amount:any;
  action:string='add';
  notes:string='';
  ngOnInit(): void {
    console.log(this.data);
  }



  updateAccount() {

    if(this.amount>0 && this.action=='add') {
    let balence = Number(this.data.balence) + Number(this.amount);
   
    this.afs.collection('accounts').doc(this.data.id).update({
      balence: balence,
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
      this.addstatements();
      this.ref.close(true);
      
    }).catch((err:any) => {
      console.log(err);
     
    })
  }
  else if(this.amount>0 && this.action=='substract') {
    let balence = Number(this.data.balence) - Number(this.amount);
   
    this.afs.collection('accounts').doc(this.data.id).update({
      balence: balence,
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
      this.ref.close(true);
      this.addstatements();
      
    }).catch((err:any) => {
      console.log(err);
     
    })
  }
  else {
    alert('Please enter a valid amount');
  }
}


addstatements() {
  let atype: string='add';
  let statement='';
  if(this.amount>0 && this.action=='add') {
   statement = 'Added '+this.amount+' on '+new Date().toLocaleString();
   atype='add';
  }
  else if(this.amount>0 && this.action=='substract') {
    statement = 'Reduced '+this.amount+' on '+new Date().toLocaleString();
    atype='sub';
  }
  this.afs.collection('accounts').doc(this.data.id).collection('statements').add({
    statement:statement,
    notes:this.notes,
    type:atype,
    createdAt:new Date(),
  }).then((res:any) => {
    console.log(res);
    this.ref.close(true);
  }).catch((err:any) => {
    console.log(err);
  })
}


  close() {
    this.ref.close(false);
  }


}
