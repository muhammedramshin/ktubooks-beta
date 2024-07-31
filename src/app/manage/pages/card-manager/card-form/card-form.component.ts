import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {

  constructor(private afs:AngularFirestore,private dialogRef:MatDialogRef<CardFormComponent>) { }
  cardNumber: any;
  cardType: any;
  cardName: any;
  cardFromDate: any;
  cardCVV: any;
  cardExpiryDate: any;
  cardBillDate: any;
  limit:any;
  secretKey: any="YiHHHvvvvYtyytghsbjysees7890jjj12kkkks3456";
  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
  encryptText(text:any, key:any) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      let keyChar = key.charCodeAt(i % key.length);
      let encryptedChar = charCode ^ keyChar;
      result += String.fromCharCode(encryptedChar);
    }
    return result;
  }

   decryptText(text:any, key:any) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      let keyChar = key.charCodeAt(i % key.length);
      let decryptedChar = charCode ^ keyChar;
      result += String.fromCharCode(decryptedChar);
    }
    return result;
  }



  save(){
   
    let encardnumber=this.encryptText(this.cardNumber,this.secretKey);
    let encardcvv=this.encryptText(this.cardCVV,this.secretKey);

  

    this.afs.collection('cards').add({
      name: this.cardName,
      cardnumber: encardnumber,
      cvv: encardcvv,
      cardexpiry: this.cardExpiryDate,
      cardfrom: this.cardFromDate,
      cardbilldate: this.cardBillDate,
      cardtype: this.cardType,
      limit: this.limit,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);

      this.cardName="";
      this.cardNumber="";
      this.cardCVV="";
      this.cardExpiryDate="";
      this.cardFromDate="";
      this.cardBillDate="";
      this.limit="";
      
      this.close();

     
    }
    ).catch((err:any) => {
      console.log(err);
     
    }
    );
  }

}
