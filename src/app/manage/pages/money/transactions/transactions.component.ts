import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTabGroup } from '@angular/material/tabs';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  todayIn: number=0;
  todayOut: number=0;
  todaysTranaction:any;
  customIn: any=0;
  customOut: any=0;
  reportIn: any=0;
  reportOut: any=0;
  expencetypes: any;
  constructor(private afs:AngularFirestore,private service:GeneralService) { }
  trascations:any;
  trascationsReport:any;

  onDateTransactions:any;
  selectedDate:any;
  selectedDateReport:any;
  selectedDateReportStart:any;
  selectedDateReportEnd:any;
  selectedIndex:any=0;
  filterActionType:any='IN';
  filterexpenceOf:any='';
  ngOnInit(): void {
    this.getTransaction();
    this.getTypes();
  }

    getTransaction() {
    //  get customers where is_active is true
      this.afs.collection('moneytransactions',(ref:any) => ref.orderBy('createdAt','desc')).valueChanges({idField:'id'}).subscribe((res:any) => {
        console.log(res);
        this.trascations = res;
        this.trascationsReport=res;
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
        this.todaysTranaction=todaysTranaction;
       
      })

     }


     filterTransaction(dateselected:any){
      
      let customIN=0;
      let customOut=0;
      let date = dateselected;
        let dateformated = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let Tranaction:any=[];
        this.trascations.forEach((item:any) => {
          // extract date from firestore timestamp without time
          let itemDate = new Date(item?.date?.toDate().getFullYear(), item?.date?.toDate().getMonth(), item?.date?.toDate().getDate());
          if(itemDate.getTime() == dateformated.getTime()){
            Tranaction.push(item);  
          }
        });
        Tranaction.forEach((item:any) => {
          if(item.action=='IN'){
            customIN += item.amount;
          }else{
            customOut += item.amount;
          }
        });
        this.customIn = customIN;
        this.customOut = customOut;
        this.onDateTransactions=Tranaction;
       
        console.log(this.onDateTransactions);
      
       
     }
     filterTransactionByDaterange(startDate:any,endDate:any){
     

      let start=startDate;
      let endon=endDate;
        let startformated = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        let endonformated = new Date(endon.getFullYear(), endon.getMonth(), endon.getDate());
        let Tranaction:any=[];

        // traction in between start and end date

        this.trascations.forEach((item:any) => {
          // extract date from firestore timestamp without time
          let itemDate = new Date(item?.date?.toDate().getFullYear(), item?.date?.toDate().getMonth(), item?.date?.toDate().getDate());
          if(itemDate.getTime() >= startformated.getTime() && itemDate.getTime() <= endonformated.getTime()){
            Tranaction.push(item);
          }
        });


        // this.trascations.forEach((item:any) => {
        //   // extract date from firestore timestamp without time
        //   let itemDate = new Date(item?.date?.toDate().getFullYear(), item?.date?.toDate().getMonth(), item?.date?.toDate().getDate());
        //   if(itemDate.getTime() == dateformated.getTime()){
        //     Tranaction.push(item);  
        //   }
        // });
     
        return Tranaction;
     }




     delete(id:any){
      if(window.confirm('Are you sure you want to delete this transaction?')){
      this.afs.collection('moneytransactions').doc(id).delete().then(res => {
        console.log(res);
        this.getTransaction();
      })
      }
    }


    filter(){
      console.log(this.selectedDate)
      this.filterTransaction(this.selectedDate);
    }


    filterReport(){
    
     console.log('report date range',this.selectedDateReport);
      if(this.selectedDateReportStart)
      {
        this.trascationsReport= this.filterTransactionByDaterange(this.selectedDateReportStart,this.selectedDateReportEnd);
        console.log('check Point',this.trascationsReport);
      }
      else{
        this.trascationsReport=this.trascations;
      }


      if(this.filterActionType=='IN'){
        console.log('check Point',this.filterActionType);
        
        this.trascationsReport=this.trascationsReport.filter((item:any)=>item.action=='IN');
      }else if(this.filterActionType=='OUT'){
        console.log('check Point',this.filterActionType);
        this.trascationsReport=this.trascationsReport.filter((item:any)=>item.action=='OUT');
      }

      let reportIn=0;
      let reportOut=0;
      this.trascationsReport.forEach((item:any) => {
        if(item.action=='IN'){
          reportIn += item.amount;
          this.reportIn=reportIn;
          this.reportOut=0;
        }else{
          reportOut += item.amount;
          this.reportOut=reportOut;
          this.reportIn=0;
        }
      }
      );

    }
    filterReportExpenceOf(){
      console.log('report date range',this.selectedDateReportStart);
      
      if(this.selectedDateReportStart)
      {
        this.trascationsReport= this.filterTransactionByDaterange(this.selectedDateReportStart,this.selectedDateReportEnd);
        this.trascationsReport=this.trascationsReport.filter((item:any)=>item.expenceof==this.filterexpenceOf);

        console.log('check Point',this.trascationsReport);
      }
      else{
        this.trascationsReport=this.trascations.filter((item:any)=>item.expenceof==this.filterexpenceOf);
      }
      
        let reportIn=0;
        let reportOut=0;

        this.trascationsReport.forEach((item:any) => {
          if(item.action=='IN'){
            reportIn += item.amount;
            this.reportIn=reportIn;
            this.reportOut=0;
          }else{
            reportOut += item.amount;
            this.reportOut=reportOut;
            this.reportIn=0;
          }
        }
        );

    }

    getTypes() {
      //  get customers where is_active is true
        this.afs.collection('expencetypes').valueChanges({idField:'id'}).subscribe((res:any) => {
          console.log("expence type:",res);
          this.expencetypes = res;
          // sort expence types by position
          this.expencetypes.sort((a: any, b: any) => a.position - b.position);
          
  
             })
  
            
      }
  

      exportToPdf() {
        if(this.trascationsReport.length>0){
      
        this.service.generatePdf(this.trascationsReport,'transactionReport');
        }
        else{
          alert('No Data Found');
          
        }
      }

}
