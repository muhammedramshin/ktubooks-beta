import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Console } from 'console';
@Component({
  selector: 'app-view-trasactions',
  templateUrl: './view-trasactions.component.html',
  styleUrls: ['./view-trasactions.component.scss']
})
export class ViewTrasactionsComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<ViewTrasactionsComponent>,@Inject(MAT_DIALOG_DATA)public data:any,private afs:AngularFirestore) { }
  transactions:any=[];
  outstanding:number=0;
  ngOnInit(): void {
    console.log(this.data);
    if(this.data.transactions){
      this.transactions=this.data.transactions.reverse();
      this.calculateOutstanding();
    }

  }


  remove(id:any){
    if(window.confirm('Are you sure you want to delete this transaction?')){
      //console.log(id);
      let index = this.transactions.indexOf(id);
       this.transactions.splice(index,1);
      //console.log(this.transactions);
      this.calculateOutstanding();
      this.update();
    }
    
  }


  calculateOutstanding(){
    this.outstanding=0;
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
    else{
      this.outstanding=0
    }
  }


  update(){
    this.afs.collection('cards').doc(this.data.id).update({
      transactions:this.transactions,
      updatedAt: new Date(),
      outstanding:this.outstanding
    });
  }

  close(){
    this.dialogRef.close();
  }

}
