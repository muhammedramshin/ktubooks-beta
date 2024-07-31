import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalDataSource } from 'ng2-smart-table';
import { GeneralService } from 'src/app/services/general.service';
import { MatBottomSheet, MatBottomSheetRef, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('addtasks') addtasks!: TemplateRef<any>;
  @ViewChild('markdone') markdone!: TemplateRef<any>;
  taskTitle: any;
  taskData: any;
  tasklabels: any;
  selectedTaskLabel: any='todo';
  addTaskLabel: any;
  taskTemp: any;
  action: string='add';
  updateid: any;
  selectedTask: any;
  constructor(private afs:AngularFirestore,private service:GeneralService,private _bottomSheet: MatBottomSheet, readonly bottomSheet: MatBottomSheet,) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.afs.collection('cart').valueChanges({idField:'id'}).subscribe((data:any)=>{
      console.log(data);
      this.taskData=data;
      if(this.taskData){
        // first sort by created date  desc and then sort by isDone
        this.taskData.sort((a:any,b:any)=>b.createdAt-a.createdAt);
        this.taskData.sort((a:any,b:any)=>a.isDone-b.isDone);
      
      }

      this.taskTemp=this.taskData;
      
      this.sortWith(this.selectedTaskLabel);


    },
    (error)=>{
      console.log(error);
    }

    )
  }
  createCart(){
    let config = {
      disableClose: true,
    }
    this.action='add';
    return this.bottomSheet.open(this.addtasks, config);
  }
  markdoneconfirm(task:any){
    this.selectedTask=task;
    let config = {
      disableClose: true,
    }

    return this.bottomSheet.open(this.markdone, config);
  }

  updateCart(task:any){
    let config = {
      disableClose: true,
    }
    this.taskTitle=task.task;
    this.addTaskLabel=task?.label;
    this.action='update';
    this.updateid=task?.id;
    return this.bottomSheet.open(this.addtasks, config);
  }


  deleteCart(task:any){
    this.afs.collection('cart').doc(task?.id).delete().then((data)=>{
     
      this.service.openSnackBar('Item Deleted Successfully','success');
    }
    ).catch((error)=>{
      
      this.service.openSnackBar('Error Occured','error');
    }
    )
  }

  closeBottomSheet() {
    this.bottomSheet.dismiss();
  }
  createRecord(){
    let data ={
      task:this.taskTitle,
      isDone:false,
      createdAt: new Date(),
      updatedAt: new Date(),

    }
    this.afs.collection('cart').add(data).then((data)=>{
      console.log(data);
      this.service.openSnackBar('Item Added Successfully','success');
      this._bottomSheet.dismiss();
      this.taskTitle='';
      this.addTaskLabel='';
    }
    ).catch((error)=>{
      console.log(error);
      this.service.openSnackBar('Error Occured','error');
      this.bottomSheet.dismiss();
      this.taskTitle='';
    }
    )
  }

  updateRecord(){
    let data ={
      task:this.taskTitle,
      updatedAt: new Date(),
    }
    this.afs.collection('cart').doc(this.updateid).update(data).then((data)=>{
      console.log(data);
      this.service.openSnackBar('Item Updated Successfully','success');
      this._bottomSheet.dismiss();
      this.taskTitle='';
      this.addTaskLabel='';
      this.updateid='';
    }
    ).catch((error)=>{
      console.log(error);
      this.service.openSnackBar('Error Occured','error');
      this.bottomSheet.dismiss();
      this.taskTitle='';
      this.addTaskLabel='';
      this.updateid='';
    }
    )
  }


  markasdone(){
    let task= this.selectedTask;
let status;
    if(task.isDone){
      status=false;
    }else{
      status=true;
    }
    this.afs.collection('cart').doc(task?.id).update({isDone:status}).then((data)=>{
      console.log(data);
      this.service.openSnackBar('Item Cleared','success');
      this._bottomSheet.dismiss();
    }
    ).catch((error)=>{
      console.log(error);
      this.service.openSnackBar('Error Occured','error');
      this.bottomSheet.dismiss();
    }
    )
  }

 
  filterByLabel(label:any){
    this.selectedTaskLabel=label;
    this.taskData=this.taskTemp;
    this.taskData=this.taskData.filter((item:any)=>item?.label==label);
   // console.log('check Point',this.taskData);
    
    
  }

  clearFilter(){
    this.selectedTaskLabel='all';
    this.taskData=this.taskTemp;
  }
  todo(){
    this.selectedTaskLabel='todo';
    this.taskData=this.taskTemp;
    this.taskData=this.taskData.filter((item:any)=>item?.isDone==false);

  }

  done(){
    this.selectedTaskLabel='done';
    this.taskData=this.taskTemp;
    this.taskData=this.taskData.filter((item:any)=>item?.isDone==true);
  }
  sortWith(label:any){
    if(label=='todo'){
      this.todo();
    }else if(label=='all'){
      this.clearFilter();
    }
    else if(label=='done'){
      this.done();
    }
    else{
      this.filterByLabel(label);
    }
  }
}
