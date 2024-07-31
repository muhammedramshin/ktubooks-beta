import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage ,AngularFireStorageReference } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  totalAmountToget: number=0;
  totalAccBalence: number=0;
  totalAmountTogive: number=0;

  constructor(private afs:AngularFirestore,private fs:AngularFireStorage) { }
  todayIn=0;
  todayOut=0;
  trasactions:any;
  ngOnInit(): void {
    this.getMoneyTranaction();
    this.getAccounts();
    // const rootRef = this.fs.ref('/');
    // rootRef.listAll().subscribe(list => {
    //   console.log("################",list.items);
    //   list.items.forEach((item:any) => {
    //     console.log(item);
    //     item.getDownloadURL().then((url:any) => {
    //       console.log(url);
    //     }) ;

    //   }
    //   );
    // });
  }

  getMoneyTranaction() {
    // get all money transaction with type LENDING and order by createdAt
    this.afs.collection('moneytransactions', ref => ref.orderBy('createdAt', 'desc')).valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
      this.trasactions = res;
      let todaysIN=0;
      let todaysOUT=0;
      let date = new Date();
      let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      let todaysTranaction:any=[];
      res.forEach((item:any) => {
        // extract date from firestore timestamp without time
        let itemDate = new Date(item?.date?.toDate().getFullYear(), item?.date?.toDate().getMonth(), item?.date?.toDate().getDate());
        if(itemDate.getTime() == today.getTime()){
          todaysTranaction.push(item);  
        }
      });
      todaysTranaction.forEach((item:any) => {
        if(item.action=='IN'){
          todaysIN += item.amount;
        }else{
          todaysOUT += item.amount;
        }
      });
      this.todayIn = todaysIN;
      this.todayOut = todaysOUT;


      // get active lendings

      this.totalAmountToget = 0;
        this.trasactions.forEach((element:any) => {
          if(element.type=='LENDING'&&element.loanClear == false) {
            this.totalAmountToget += element.amount;
          }
        });

        this.totalAmountTogive = 0;
        this.trasactions.forEach((element:any) => {
          if(element.type=='LOAN'&&element.loanClear == false) { 
            this.totalAmountTogive += element.amount;
          }
        });


        console.log("to get",this.totalAmountToget);


      
    })
  }



  getAccounts() {
    this.afs.collection('accounts').valueChanges({idField: 'id'}).subscribe((res:any) => {
      console.log(res);
     
      this.totalAccBalence=0;
      res.forEach((element:any) => {
        this.totalAccBalence+=Number(element.balence);
      }
      );

    })
  }

  uploadFile(event:any) {
    const file = event.target.files[0];
    const filePath = '<your-folder-name>' + '/' + file.name;
    const task = this.fs.upload(filePath, file);
  }

}
