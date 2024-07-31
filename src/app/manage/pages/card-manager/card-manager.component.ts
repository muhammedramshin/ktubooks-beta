import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardFormComponent } from './card-form/card-form.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GeneralService } from 'src/app/services/general.service';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { ViewTrasactionsComponent } from './view-trasactions/view-trasactions.component';

@Component({
  selector: 'app-card-manager',
  templateUrl: './card-manager.component.html',
  styleUrls: ['./card-manager.component.scss']
})
export class CardManagerComponent implements OnInit {
  cards: any;
  secretKey: any="YiHHHvvvvYtyytghsbjysees7890jjj12kkkks3456";
   gradients = [
    { color1: '#fd746c', color2: '#ff9068' },
    { color1: '#4facfe', color2: '#00f2fe' },
    { color1: '#8e2de2', color2: '#4a00e0' },
    { color1: '#ff7e5f', color2: '#feb47b' },
    { color1: '#6a11cb', color2: '#2575fc' },
    { color1: '#00c3ff', color2: '#ffff1c' },
    { color1: '#f12711', color2: '#f5af19' },
    { color1: '#00b4db', color2: '#0083b0' },
    { color1: '#ff512f', color2: '#dd2476' },
    { color1: '#fe8c00', color2: '#f83600' },
    { color1: '#6a3093', color2: '#a044ff' },
    { color1: '#8a2387', color2: '#e94057' },
    { color1: '#fd746c', color2: '#ff9068' },
    { color1: '#4facfe', color2: '#00f2fe' },
    { color1: '#8e2de2', color2: '#4a00e0' },
    { color1: '#ff7e5f', color2: '#feb47b' },
];
search:any;
  cardTemp: any;
  displayData: any;
  totalOutstanding: number=0;
  constructor(private dialog:MatDialog,private afs:AngularFirestore,private service:GeneralService) { }
  typeFilter:string='all';
  ngOnInit(): void {
    this.getallcards();
  }

  addCard(){

    const dialogRef = this.dialog.open(CardFormComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  getallcards(){
    this.afs.collection('cards').valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
      this.cards=res;
      this.cardTemp=res;
      this.calculateSummery();
      this.searchCard();
    })
  }


  searchCard(){
    this.cards=this.cardTemp;
    if(this.search==''){
      this.cards=this.cardTemp;
    }
    if(this.search){
      let cards=this.cards.filter((card:any) => {
        return card.name.toLowerCase().includes(this.search.toLowerCase())
      })
      console.log(cards);
      this.cards=cards
    }
    
  }

  filterCard(type:any){
    this.typeFilter=type;
    this.cards=this.cardTemp;
    if(type=='all'){
      return this.cards=this.cardTemp;
    }
    if(type){
      let cards=this.cards.filter((card:any) => {
        return card.cardtype.toLowerCase().includes(type)
      })
      console.log(cards);
      this.cards=cards
    }
    
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


  cardNumberDisplay(text:any){
    let number= this.decryptText(text,this.secretKey);
    // 14 xxxx xxxx xxxx  and last 4 digits
    let last4=number.substring(number.length-4);
    return 'XXX XXXX XXXX '+last4;
  }
  cardNumberDisplayData(text:any){
    let number= this.decryptText(text,this.secretKey);
    // 14 xxxx xxxx xxxx  and last 4 digits
    return number
  }
  cardcvvDisplayData(item:any){
    let number= this.decryptText(item.cvv,this.secretKey);
    // 14 xxxx xxxx xxxx  and last 4 digits
    return number
  }

  cvvDisplay(){
    return '***'
  }

  showCred(item:any){
    let pin = prompt("Enter your pin to continue");
    if(pin === '400'){
      setTimeout(() => {
        this.displayData=0
      }, 30000);
    if(this.displayData!=item.id)
      {
        this.displayData=item.id;
      }
    }
  }

  copyToClipboard(text:any,type:string) {

    let pin = prompt("Enter your pin to continue");
    if(pin === '400'){
    let result=this.decryptText(text,this.secretKey);
    navigator.clipboard.writeText(result);
    this.service.openSnackBar(type+' copied to clipboard','OK');
    }
    else{

    }
  }


  copyAll(card:any){
    let pin = prompt("Enter your pin to continue");
    if(pin === '400'){
    let cardnum=this.decryptText(card.cardnumber,this.secretKey);
    let cvv =this.decryptText(card.cvv,this.secretKey);
    let expiry =card.cardexpiry;
    let result=cardnum+' '+cvv+' '+expiry;
    navigator.clipboard.writeText(result);
    this.service.openSnackBar('card data copied to clipboard','OK');
    }
    else{

    }
  }


  generateBackground(cardType: string,index:any): string {
    const gradientSelected=this.gradients[index];
     
    let gradientColor: string;
    gradientColor = 'linear-gradient(45deg,'+gradientSelected.color1+', '+gradientSelected.color2+')';
    // console.log('check Point',cardType);
    // if (cardType === 'credit') {
    //     //gradientColor = 'linear-gradient(45deg, #e4c391, #c32d2d)';
    //     gradientColor = 'linear-gradient(45deg, #2ecc71, #ffffff)';
    // } else if (cardType === 'debit') {
    //     gradientColor = 'linear-gradient(45deg, #71c8e4, #2d6fe4)';
    // } else {
    //     // Default gradient if card type is neither credit nor debit
    //     gradientColor = 'linear-gradient(45deg, #CCCCCC, #999999)';
    // }
    return gradientColor;
}

addTransaction(data:any){
  const dialogRef = this.dialog.open(TransactionFormComponent, {
    width: '500px',
    data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    this.calculateSummery();
  })
}


getTotal(card: any): number {
  return Number(card.outstanding || 0) + Number(card.limit);
}

viiewTrasactions(card:any){
  const dialogRef = this.dialog.open(ViewTrasactionsComponent, {
    width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      panelClass: 'full-screen-dialog',
    data: card
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  })
}



calculateSummery(){
  this.totalOutstanding=0;
  this.cards.forEach((card:any) => {
    if(card.cardtype=='credit'){
      if(card?.outstanding){
      this.totalOutstanding+=Number(card.outstanding);
      }
    }
  })
  this.totalOutstanding=Math.abs(this.totalOutstanding);
}

}
