import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<TransactionFormComponent>,private afs : AngularFirestore,@Inject(MAT_DIALOG_DATA)public data:any) { }
  description:any;
  type:any;
  amount:number=0;
  transactions:any=[]
  outstanding:number=0;
  spendby:any='me';
  ngOnInit(): void {
    if(this.data.transactions){
      this.transactions=this.data.transactions;
      
    }
  }

  close(){
    this.dialogRef.close();
  }

  addTransaction(){

    // check all field are valid

    if(!this.description || !this.type || !this.amount){
      return;
    }


    let t:any={
      description:this.description,
      type:this.type,
      amount:this.amount,
      createdAt: new Date(),
      tid:new Date().getTime(),
      spendby:this.spendby
    };

    this.transactions.push(t);

    if(this.transactions.length>0){
      this.data.transactions=this.transactions;
      this.calculateOutstanding();
      this.update();
    }

  }

  update(){

    this.afs.collection('cards').doc(this.data.id).update({
      transactions:this.data.transactions,
      updatedAt: new Date(),
      outstanding:this.outstanding
    });

    this.description="";
    this.type="";
    this.amount=0;
    this.close();

  }


  calculateOutstanding(){

    if(this.transactions.length>0){
      this.transactions.forEach((item:any) => {
        if(item.type=='spend'){
          this.outstanding-=Number(item.amount);
        }
        else{
          this.outstanding+=Number(item.amount);
        }
      });
    }
  }

}
