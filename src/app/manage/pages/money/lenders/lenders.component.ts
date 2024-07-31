import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ClearbuttonComponent } from './clearbutton/clearbutton.component';
import { MatTabGroup } from '@angular/material/tabs';
@Component({
  selector: 'app-lenders',
  templateUrl: './lenders.component.html',
  styleUrls: ['./lenders.component.scss']
})
export class LendersComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  totalAmountToget: number = 0;
  totalAmountGiven: number = 0;
  settings = {
    mode: 'inline',
    actions: {
      position: 'right',
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
        title: 'Lender Name',
      },
      totalLended: {
        title: 'Total Lended',
      },
      pendingAmount: {
        title: 'Pending Amount',
      },
      totalLoan: {
        title: 'Total Loan',
      },
      pendingLoan: {
        title: 'Pending Loan',
      },

    }
  };

  settingsLendings={
    actions: {
      position: 'right',
      add: false,
      edit:false,
      delete:false,
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
      deleteButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
      confirmDelete: true,
    },
    columns: {
      loanTo: {
        title: 'Lender Name',
        type: 'text',
      },
      amount: {
        title: 'Amount',
      },
      date: {
        title: 'Date',
        type: 'html',
        valuePrepareFunction: (col:any,row:any) => {
          var raw = new Date(row.date.seconds * 1000);
          var formatted = raw.getDate() + " - " + (raw.getMonth() + 1) + " - " + raw.getFullYear();
          
          return formatted +'<br>'+row.notes;
        }
      },
      loanClear: {
        title: 'Cleared',
        type: 'html',
        valuePrepareFunction: (loanClear:any) => {
          if(loanClear) {
            return `<span class="badge bg-success badge-success">Yes</span>`;
          } else {
            return `<span class="badge bg-danger badge-danger">No</span>`;
          }
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: true, title: 'Yes' },
              { value: false, title: 'No' },
            ],
          }
        }
      },
      customAction: {
        title: 'Custom Action',
        type: 'custom',
        renderComponent: ClearbuttonComponent,
      },
    }
  };

  settingsLendingsActive={
    actions: {
      position: 'right',
      add: false,
      edit:false,
      delete:false,
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
      deleteButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
      confirmDelete: true,
    },
    columns: {
      loanTo: {
        title: 'Lender Name',
        type: 'text',
      },
      amount: {
        title: 'Amount',
      },
      date: {
        title: 'Date',
        type: 'html',
        valuePrepareFunction: (col:any,row:any) => {
          var raw = new Date(row.date.seconds * 1000);
          var formatted = raw.getDate() + " - " + (raw.getMonth() + 1) + " - " + raw.getFullYear();
          
          return formatted +'<br>'+row.notes;
        }
      },
      customAction: {
        title: 'Custom Action',
        type: 'custom',
        renderComponent: ClearbuttonComponent,
      },
    }
  };
  settingsLoans={
    actions: {
      position: 'right',
      add: false,
      edit:false,
      delete:false,
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
      deleteButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
      confirmDelete: true,
    },
    columns: {
      loanFrom: {
        title: 'Lender Name',
        type: 'text',
      },
      amount: {
        title: 'Amount',
      },
      date: {
        title: 'Date',
        type: 'text',
        valuePrepareFunction: (date:any) => {
          var raw = new Date(date.seconds * 1000);
          var formatted = raw.getDate() + " - " + (raw.getMonth() + 1) + " - " + raw.getFullYear();
          return formatted;
        }
      },
      loanClear: {
        title: 'Cleared',
        type: 'html',
        valuePrepareFunction: (loanClear:any) => {
          if(loanClear) {
            return `<span class="badge bg-success badge-success">Yes</span>`;
          } else {
            return `<span class="badge bg-danger badge-danger">No</span>`;
          }
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: true, title: 'Yes' },
              { value: false, title: 'No' },
            ],
          }
        }
      },
      customAction: {
        title: 'Custom Action',
        type: 'custom',
        renderComponent: ClearbuttonComponent,
      },
    }
  };
  sourceLendings: LocalDataSource = new LocalDataSource();
  sourceLoan: LocalDataSource = new LocalDataSource();
  sourceActiveLenders: LocalDataSource = new LocalDataSource();
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  loanList: any;
  totalAmountTogive: any;

  //assign tab group to get active tab
  

  constructor(private afs:AngularFirestore) { }
  lenders:any;
  lendedList:any;
  ngOnInit(): void {
    this.getLenders();
    this.getMoneyTranactionWithLendingType();
    this.getMoneyTranactionWithLoanType();
    // set action custom title by check row condition

    

  }


  getLenders() {
   
      this.afs.collection('lenders').valueChanges({idField:'id'}).subscribe((res:any) => {
        console.log(res);
        this.lenders = res;
        this.source.load(this.lenders);
           })

           console.log(this.lenders);
     }

     addLender(event:any) {
      console.log(event);
      this.afs.collection('lenders').add({
        name: event.newData.name,
        createdAt: new Date(),
        updateAt: new Date(),
        is_Active: true,
      }).then(() => {
        event.confirm.resolve();
      }).catch((error) => {
        console.log(error);
      })
    }

    updateLender(event:any) {
      console.log(event);
      this.afs.collection('lenders').doc(event.data.id).update({
        name: event.newData.name,
        updateAt: new Date(),
      }).then(() => {
        event.confirm.resolve();
      }).catch((error) => {
        console.log(error);
      })
    }

    deleteLender(event:any) {
      console.log(event);
      this.afs.collection('lenders').doc(event.data.id).delete().then(() => {
        event.confirm.resolve();
      }).catch((error) => {
        console.log(error);
      })
    }


    getMoneyTranactionWithLendingType() {
      // get all money transaction with type LENDING and order by createdAt
      this.afs.collection('moneytransactions', ref => ref.where('type', '==', 'LENDING').orderBy('createdAt', 'desc')).valueChanges({idField:'id'}).subscribe((res:any) => {
        console.log(res);
        this.lendedList = res;
        this.totalAmountToget = 0;
        this.lendedList.forEach((element:any) => {
          if(element.loanClear == false) {
            this.totalAmountToget += element.amount;
          }
        });
        console.log('Lenders list: ',this.lendedList);
        this.sourceLendings.load(this.lendedList);
        this.sourceActiveLenders.load(this.lendedList.filter((lender:any) => lender.loanClear==false));

        this.lenders.forEach((element:any) => {
          element.totalLended = 0;
          element.pendingAmount = 0;
          this.lendedList.forEach((element2:any) => {
            if(element.name == element2.loanTo) {
              element.totalLended += element2.amount;
              if(element2.loanClear == false) {
                element.pendingAmount += element2.amount;
              }
            }
          });
        }
        )
        this.source.load(this.lenders);
      })
    }


    getMoneyTranactionWithLoanType() {
      // get all money transaction with type LENDING and order by createdAt
      this.afs.collection('moneytransactions', ref => ref.where('type', '==', 'LOAN').orderBy('createdAt', 'desc')).valueChanges({idField:'id'}).subscribe((res:any) => {
        console.log(res);
        this.loanList = res;
        this.totalAmountTogive = 0;
        this.loanList.forEach((element:any) => {
          if(element.loanClear == false) {
            this.totalAmountTogive += element.amount;
          }
        });
        this.sourceLoan.load(this.loanList);
        this.lenders.forEach((element:any) => {
          
          element.totalLoan = 0;
          element.pendingLoan = 0;
          this.loanList.forEach((element2:any) => {
            
            if(element.name == element2.loanFrom) {
              element.totalLoan += element2.amount;
              if(element2.loanClear == false) {
                element.pendingLoan += element2.amount;
              }
            }

          });
        }
        )
        this.source.load(this.lenders);
      })
    }

    clearLending(event:any) {

      if(event.action == 'closelending') {
      console.log(event);
      // update key loanClear to true
      this.afs.collection('moneytransactions').doc(event.data.id).update({
        loanClear: true,
        updateAt: new Date(),
      }).then(() => {
        event.confirm.resolve();
      }
      ).catch((error) => {
        console.log(error);
      }
      )
    }
    else if(event.action=='undolending'){
      console.log(event);
      // update key loanClear to true
      this.afs.collection('moneytransactions').doc(event.data.id).update({
        loanClear: false,
        updateAt: new Date(),
      }).then(() => {
        event.confirm.resolve();
      }
      ).catch((error) => {
        console.log(error);
      }
      )
    }
    }

    onSwipeLeft() {
      alert('swipe left');
      const selectedIndex:any = this.tabGroup.selectedIndex;
      if (selectedIndex < this.tabGroup._tabs.length - 1) {
        this.tabGroup.selectedIndex = selectedIndex + 1;
      }
    }
    
    onSwipeRight() {
      alert('swipe right');
      const selectedIndex:any = this.tabGroup.selectedIndex;
      if (selectedIndex > 0) {
        this.tabGroup.selectedIndex = selectedIndex - 1;
      }
    }

}
