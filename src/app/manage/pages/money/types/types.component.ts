import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {
  accountSource:any=new LocalDataSource();
  incomeSource:any=new LocalDataSource();
  moneynoteSource:any=new LocalDataSource();
  activitySource:any=new LocalDataSource();
  accountsettings = {
    mode: 'inline',
    actions: {
      position: 'right',
      add: true,
      edit: true,
      delete: true,
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
      accounttype: {
        title: 'Account Type'
      },
      shortname:{
        title: 'Short Name'
      },
      balence: {
        title: 'Balence'
      },
      type:{
        title: 'Type'
      },
      position:{
        title: 'Position'
      }
    }
  };
  incomesettings = 
  {
    mode: 'inline',
    actions: {
      position: 'right',
      add: true,
      edit: true,
      delete: true,
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
      incometype: {
        title: 'Income Type'
      },
    }
  };
  moneynotesettings = 
  {
    mode: 'inline',
    actions: {
      position: 'right',
      add: true,
      edit: true,
      delete: true,
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
      name: {
        title: 'Note title'
      },
    }
  };
  constructor(private afs:AngularFirestore) { }

  ngOnInit(): void {
    
    this.getAccountTypes();
    this.getIncomeTypes();
    this.getMoneyNotes();
  }

  createAccountType(event:any) {
    console.log(event);
    this.afs.collection('accounttypes').add({
      accounttype: event.newData.accounttype,
      createdAt: new Date(),
      type: event.newData.type,
      balence: event.newData.balence,
      shortname: event.newData.shortname,
      position: event.newData.position,
    }).then((res:any) => {
      console.log(res);
      event.confirm.resolve(event.newData);
    }).catch((err:any) => {
      console.log(err);
      event.confirm.reject();
    })
  }

  deleteAccountType(event:any) {
    console.log(event);
    this.afs.collection('accounttypes').doc(event.data.id).delete().then((res:any) => {
      console.log(res);
      event.confirm.resolve(event.data);
    }).catch((err:any) => {
      console.log(err);
      event.confirm.reject();
    })
  }

  editAccountType(event:any) {
    console.log(event);
    this.afs.collection('accounttypes').doc(event.data.id).update({
      accounttype: event.newData.accounttype,
      type: event.newData.type,
      balence: event.newData.balence,
      shortname: event.newData.shortname,
      position: event.newData.position,
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
      event.confirm.resolve(event.newData);
    }).catch((err:any) => {
      console.log(err);
      event.confirm.reject();
    })
  }

  getAccountTypes() {
    this.afs.collection('accounttypes').valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
      this.accountSource.load(res);
    })
  }

  createIncomeType(event:any) {
    console.log(event);
    this.afs.collection('incometypes').add({
      incometype: event.newData.incometype,
      createdAt: new Date(),
    }).then((res:any) => {
      console.log(res);
      event.confirm.resolve(event.newData);
    }).catch((err:any) => {
      console.log(err);
      event.confirm.reject();
    })
  }

  deleteIncomeType(event:any) {
    console.log(event);
    this.afs.collection('incometypes').doc(event.data.id).delete().then((res:any) => {
      console.log(res);
      event.confirm.resolve(event.data);
    }).catch((err:any) => {
      console.log(err);
      event.confirm.reject();
    })
  }

  editIncomeType(event:any) {
    console.log(event);
    this.afs.collection('incometypes').doc(event.data.id).update({
      incometype: event.newData.incometype,
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
      event.confirm.resolve(event.newData);
    }).catch((err:any) => {
      console.log(err);
      event.confirm.reject();
    })
  }

  getIncomeTypes() {
    this.afs.collection('incometypes').valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
      this.incomeSource.load(res);
    })
  }



  createMoneyNote(event:any) {
    this.afs.collection('moneynotes').add({
      name: event.newData.name,
      note: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
    }).catch((err:any) => {
      console.log(err);
    })
  }


  updateMoneyNote(data:any) {
      console.log('check Point',data);
      
    this.afs.collection('moneynotes').doc(data?.newData?.id).update({
      name: data?.newData?.name,
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
    }).catch((err:any) => {
      console.log(err);
    })
  }

  deleteMoneyNote(event:any) {
    
    this.afs.collection('moneynotes').doc(event.data.id).delete().then((res:any) => {
      console.log(res);
      event.confirm.resolve(event.data);
    }).catch((err:any) => {
      console.log(err);
      event.confirm.reject();
    })
  }

    
  getMoneyNotes() {
    this.afs.collection('moneynotes').valueChanges({idField: 'id'}).subscribe((res:any) => {
      console.log(res);
      this.moneynoteSource=res;
    });

  }

}
