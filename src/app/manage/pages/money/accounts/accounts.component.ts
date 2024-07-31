import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalDataSource } from 'ng2-smart-table';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UpdateComponent } from './update/update.component';
import { StatementComponent } from './statement/statement.component';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accountsettings = {
    mode: 'inline',
    actions: {
      position: 'right',
      add: true,
      edit: true,
      delete: true,
      custom:[{
        name: 'update',
        title: '<i class="fa fa-plus-square" aria-hidden="true"></i>',
      },
      {
        name: 'view',
        title: '<i class="fa fa-eye" aria-hidden="true"></i>',
      }
    ]
    },
    add: {
      addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
      createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
      cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="fa fa-pencil" aria-hidden="true"></i>',
      saveButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
      cancelButtonContent:  '<i class="fa fa-times" aria-hidden="true"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
      confirmDelete: true,
    },
    columns: {
      account: {
        title: 'Account',
        // editor: {
        //   type: 'list',
        //   config: {
        //     selectText: 'Select',
        //     list: [],
        //   },
        // },
      },
      balence: {
        title: 'Balence'
      },
      type:{
        title:'Type',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [{value:'cash',title:'Cash'},{value:'bank',title:'Bank'},{value:'credit',title:'Credit'},{value:'investment',title:'Investments'}],
          },
      }
    }

    }
  };
  accountSource:any=new LocalDataSource();
  totalBalence:number=0;
  totalBankBalence: number=0;
  totalCashBalence: number=0;
  totalInvestmentBalence: number=0;
  totalCreditBalence: number=0;
  totalLoan:number=0;
  accountsDatas:any;
  totalamount:any;
  acctypes:any=[];
  accountsDatasTemp: any;
  totalBankAmount:any=0;
  constructor(private afs:AngularFirestore,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAccountTypes();
    this.getAccounts();
  
  }



  createAccount(event:any) {
    console.log(event);
    this.afs.collection('accounts').add({
      account: event.newData.account,
      balence: event.newData.balence,
      type:event.newData.type,
      createdAt: new Date(),
      updatedAt: new Date(),

    }).then((res:any) => {
      console.log(res);
      event.confirm.resolve(event.newData);
    }).catch((err:any) => {
      console.log(err);
      event.confirm.reject();
    })
  }

  updateAccount(event:any) {
    console.log(event);
    this.afs.collection('accounts').doc(event.data.id).update({
      account: event.newData.account,
      balence: event.newData.balence,
      type:event.newData.type,
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
      event.confirm.resolve(event.newData);
    }).catch((err:any) => {
      console.log(err);
      event.confirm.reject();
    })
  }

  deleteAccount(event:any) {
    console.log(event);
    if(window.confirm("Confirm Delete")){
      this.afs.collection('accounts').doc(event.data.id).delete().then((res:any) => {
        console.log(res);
        event.confirm.resolve();
      }).catch((err:any) => {
        console.log(err);
        event.confirm.reject();
      })
    }
  
  }


  getAccounts() {
    this.afs.collection('accounts').valueChanges({idField: 'id'}).subscribe((res:any) => {
      console.log(res);
      this.accountSource.load(res);
      this.totalBalence=0;
      this.totalBankBalence=0;
      this.totalCashBalence=0;
      this.totalInvestmentBalence=0;
      this.totalCreditBalence=0;
      
      res.forEach((element:any) => {
        if(element.type=='bank'){
          this.totalBankBalence+=Number(element.balence);
          this.totalBalence+=Number(element.balence);
        }
        else if(element.type=='cash'){
          this.totalCashBalence+=Number(element.balence);
          this.totalBalence+=Number(element.balence);
        }
        else if(element.type=='credit'){
          this.totalCreditBalence+=Number(element.balence);
          this.totalBalence-=Number(element.balence);
        }
        else if(element.type=='investment'){

          this.totalInvestmentBalence+=Number(element.balence);
          this.totalBalence+=Number(element.balence);
        }

       
      }
      );

    })
  }

  getAccountTypes(){
    this.afs.collection('accounttypes').valueChanges({idField: 'id'}).subscribe((res:any) => {
      // console.log(res);
      // let list:any=[];
      // res.forEach((element:any) => {
      //   list.push({value:element.accounttype, title:element.accounttype});
      // });

      this.accountsDatas=res;
      this.accountsDatasTemp=res;
      
      let total=0;
      this.acctypes=[];
      this.accountsDatas.forEach((element:any) => {
        total+=Number(element.balence);
        if(!this.acctypes.includes(element.type)){
          this.acctypes.push(element.type);
        }
      });
      
      this.totalamount=total;
      this.totalValues();
      console.log( this.acctypes);
      // this.accountsettings.columns.account.editor.config.list=list;
      // console.log(this.accountsettings);
      // this.accountsettings = Object.assign({}, this.accountsettings);
    })
  }


  filteracctype(event:any){
    console.log('check Point',event);
    let type=event.target.value;
    this.accountsDatas=this.accountsDatasTemp;
    if(type){
      this.accountsDatas=this.accountsDatas.filter((item:any) => item.type == type);
    }
    let total=0;
    this.accountsDatas.forEach((element:any) => {
      total+=Number(element.balence);
    });
    this.totalamount=total;
  }

  totalValues(){
    let dataBank=this.accountsDatas.filter((item:any) => item.type == 'BANK');
    let dataCreditCard=this.accountsDatas.filter((item:any) => item.type == 'CREDITCARD');
    let total=0;
    dataBank.forEach((element:any) => {
      total+=Number(element.balence);
    });
    this.totalBankAmount=total;

    total=0;
    dataCreditCard.forEach((element:any) => {
      total+=Number(element.balence);
    });
    this.totalCreditBalence=total;


  }

  updateAccountBalence(event:any) {
    if(event.action=='update'){
      const dialog= this.dialog.open(UpdateComponent, {
        width: '500px',
        data: event.data
      });
      dialog.afterClosed().subscribe((res:any) => {
        this.getAccounts();
      })
    }
    else if(event.action=='view'){
      const dialog= this.dialog.open(StatementComponent, {
        width: '500px',
        data: event.data
      });
      dialog.afterClosed().subscribe((res:any) => {
        this.getAccounts();
      })
    }

    }

}
