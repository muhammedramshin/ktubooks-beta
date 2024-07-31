import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';

export interface User {
  name: string;
}
@Component({
  selector: 'app-create-trasaction',
  templateUrl: './create-trasaction.component.html',
  styleUrls: ['./create-trasaction.component.scss']
})

export class CreateTrasactionComponent implements OnInit {
  loanersList: any;
  loading: boolean = false;
  expencetypes: any;
  incometypes: any;
  lenders: any;
  loanFrom: any;
  lendedList: any;
  consumedFrom: any;
  consumedList: any;
  todayIn: number=0;
  todayOut: number=0;
  constructor(private afs: AngularFirestore,private service:GeneralService) { }
  amount: any;
  action: any = 'OUT';
  actionType: any = ["IN", "OUT"];
  outcome='WANT';
  datePin:boolean=false;
  typeListOut: any = ["EXPENCE","LENDING"];
  type: any = this.action=='IN'?'INCOME':'EXPENCE';
  typeListIn: any = ["INCOME","LOAN","RETURN"];
  expenseType: any = ["FOOD", "RENT", "OTHER", "BILL"];
  expenceOutcome: any = ["WANT","NEED"];
  expenceof: any = '';
  incomeof: any = '';
  tid: any;
  date: any = new Date();
  editDate: boolean = false;
  loanTo: any = '';
  notes: any = '';
  loanReturn: any;
  loanToClear: any = '';
  @ViewChild('autoInput') input: any;
  options: User[]=[{name:'test'}, {name:'test2'}];
  filteredOptions$: Observable<any[]> | undefined;

  ngOnInit(): void {
    
    this.getTypes();
    this.getLenders();
    this.getIncomeTypes();
    this.getAccountTypes();
    this.getMoneyTranaction();
  }

  



  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  // getCustomers() {
  //   //  get customers where is_active is true
  //     this.afs.collection('customer',ref => ref.where('is_active','==',true).orderBy('name','asc')).valueChanges({idField:'id'}).subscribe((res:any) => {
  //       console.log(res);
  //       this.loanersList = res;
  //       this.loanersListTemp = res;
  //     })

  //    }



  getAccountTypes(){
    this.afs.collection('accounttypes').valueChanges({idField: 'id'}).subscribe((res:any) => {
      this.consumedList=res;
      // order by position
      this.consumedList.sort((a: any, b: any) => a.position - b.position);
      this.consumedFrom=this.consumedList[0].id;
    })
  }



  getTypes() {
    //  get customers where is_active is true
      this.afs.collection('expencetypes').valueChanges({idField:'id'}).subscribe((res:any) => {
        console.log("expence type:",res);
        this.expencetypes = res;
        // sort expence types by position
        this.expencetypes.sort((a: any, b: any) => a.position - b.position);
        this.expencetypes = this.expencetypes.filter((element: any) => element.is_active === true);

           })

          
    }

    getIncomeTypes() {
      //  get customers where is_active is true
        this.afs.collection('incometypes').valueChanges({idField:'id'}).subscribe((res:any) => {
          console.log(res);
          this.incometypes = res;
        })
        console.log(this.incometypes);
      }



  getLenders() {
      this.afs.collection('lenders').valueChanges({idField:'id'}).subscribe((res:any) => {
        console.log(res);
        this.lenders = res;
        this.filteredOptions$ = of(this.lenders);
        // this.options = res.map((item: any) => {
        //   return {name:item.name}
        // });
        // console.log("options",this.options);
      })
      console.log(this.expencetypes);
    }

    createLenders(name: any) {
      let temp={
        name: name,
        createdAt: new Date(),
        updateAt: new Date(),
        is_Active: true,
      }
      console.log(temp);
      this.afs.collection('lenders').add(temp).then((docRef: any) => {
        console.log("Document written with ID: ", docRef.id);

      }).catch((error: any) => {
          console.error("Error adding document: ", error);
        });
    }


  add() {
if(this.amount>0){

    this.loading = true;
    let Tid= 'TX-'+new Date().getTime();
      let temp={
        amount: this.amount,
        action: this.action,
        date: this.date,
        type: this.type,
        expenceof: this.expenceof,
        incomeof: this.incomeof,
        loanTo: this.loanTo.name?this.loanTo?.name:this.loanTo?this.loanTo:'',
        loanClear: false,
        loanFrom: this.loanFrom?.name?this.loanFrom?.name:this.loanFrom?this.loanFrom:'',
        createdAt: new Date(),
        updateAt: new Date(),
        notes: this.notes,
        expanceOutcome: this.outcome,
        tid: Tid,
        consumedFrom: this.consumedFrom,
      }
      console.log("Temo ### ,",temp);
      console.log("Temo ### ,",this.loanTo?.name);


      if(this.type=='LENDING'){
          //check if loaner is already exist
          let loanerExist=false;
          this.lenders.forEach((element: any) => {
            if(element.name==this.loanTo?.name){
              loanerExist=true;
            }
          }
          );
          if(!loanerExist){
            this.createLenders(this.loanTo);
          }
    
      }
      if(this.type=='LOAN'){
        //check if loaner is already exist
        let loanerExist=false;
        this.lenders.forEach((element: any) => {
          if(element.name==this.loanFrom?.name){
            loanerExist=true;
          }
        }
        );
        if(!loanerExist){
          this.createLenders(this.loanFrom);
        }
      }
      if(this.type=='RETURN'){
        //check if loaner is already exist
        if(this.loanReturn){
        this.updateLoanToClear();
        }
      }

      console.log(temp);
      this.afs.collection('moneytransactions').add(temp).then((docRef: any) => {
        console.log("Document written with ID: ", docRef.id);
        this.service.openSnackBar('Transaction Added Successfully', 'Close');
        this.loading = false;
        this.updateAccount(this.consumedFrom,this.action,this.amount);
        this.resetForm();
        
      }).catch((error: any) => {
          console.error("Error adding document: ", error);
          this.loading = false;
        });
      }
      else{
        this.service.openSnackBar('Amount required', 'Close');
      }
    }
  //
  

    resetForm(){
      this.amount=0;
      // this.action=this.a;
      // this.type='INCOME';
      this.expenceof='';
      this.incomeof='';
      this.loanTo='';
      this.notes='';
      if(!this.datePin){
        this.date=new Date();
      }
     
      this.editDate=false;
    }





  private filter(value: string): any[] {
    const filterValue = value.toString().toLowerCase();
    console.log(this.lenders);
    console.log(filterValue);
    return this.lenders.filter((optionValue: any) => optionValue['name'].toString().toLowerCase().includes(filterValue));
  }


  getFilteredOptions(value: string): Observable<any[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }


  onChange() {
    console.log('check Point ...',this.type);

    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event: any) {
    this.filteredOptions$ = this.getFilteredOptions($event);
    console.log('check Point',this.type);
    
    
  }


  onselect(){
    console.log(this.loanReturn);
    if(this.type=='RETURN'){
      this.getLendings();
    }
  }

  displayFn(country: any): any {
    return country && country.name ? country.name : '';
  }


  getLendings() {
    this.afs.collection('moneytransactions', ref => ref.where('type', '==', 'LENDING').orderBy('createdAt', 'desc')).valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
      this.lendedList = res;
     let temp= this.lendedList.filter((item: any) => item.loanTo==this.loanReturn?.name && item.loanClear==false);
      console.log(temp);
      this.lendedList=temp;

    },
    (error: any) => {
      console.log(error);
    }
    );
  }


  updateLoanToClear() {
    console.log(this.loanToClear); // Display the selected value
    this.lendedList.forEach((element: any) => {
      if(element.id==this.loanToClear){
        let payload;

        if(this.amount<element.amount){
          payload= {loanClear: false,
          updatedAt: new Date(),
          AmountReturned: this.amount,
          amountActual: element.amount,
          amount: element.amount-this.amount,

          }
        }
        else{
          payload= {
            loanClear: true,
            updatedAt: new Date(),

            }
        }
        
        this.afs.collection('moneytransactions').doc(element.id).update(payload).then((res: any) => {
          console.log(res);
          this.service.openSnackBar('Loan Cleared Successfully', 'Close');
          this.getLendings();
        })
        .catch((error: any) => {
          console.log(error);
        })
      }
    }
    );
  }




  updateAccount(id:any,action:any,amount:any) {
     const acc= this.consumedList.filter((item: any) => {
        return item.id == id
      });
      let newbalence=0;

      if(action=='INCOME'){
        newbalence=acc[0].balence+amount;
      }
      else{
        newbalence=acc[0].balence-amount;
      }

      let statement={
        date:this.date,
        amount:amount,
        type:action
      };
      let oldStatement=acc?.statement?acc?.statement:[];
      oldStatement.push(statement);

    this.afs.collection('accounttypes').doc(id).update({
      balence: newbalence,
      updatedAt: new Date(),
      statement:oldStatement
    }).then((res:any) => {
      
    }).catch((err:any) => {
      console.log(err);
      
    })
  }




  getMoneyTranaction() {
    // get all money transaction with type LENDING and order by createdAt
    this.afs.collection('moneytransactions', ref => ref.orderBy('createdAt', 'desc')).valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
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
    })
  }

}
