import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.scss']
})
export class EstimationComponent implements OnInit {
  
  constructor(private afs:AngularFirestore,private router:Router,private route:ActivatedRoute) { }
  total:number=0;
  totalIn:number=0;
  totalOut:number=0;
  InItems:any=[];
  OutItems:any=[];
  type:any='create';
  currentId:any;
  name:any;
  lastUpdated:any;
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      console.log(params['id']);
      if(params['id']!='new'){
        this.getEstimates(params['id']);
        this.currentId=params['id'];
        this.type='edit';
      }
      else{
        this.type='create';
        this.InItems=[];
        this.OutItems=[];
        this.total=0;
        this.totalIn=0;
        this.totalOut=0;
        this.name='';

      }
    });
  }


  addInItems(amount:HTMLInputElement,label:HTMLInputElement){
    console.log(amount.value,label.value);
    if(amount.value)
      {
        let amountval:any=Number(amount.value);
        console.log(amountval);
        let labelval:any=label.value;
        console.log(labelval);
        this.InItems.push({amount:amountval,label:labelval});
        this.total+=Number(amountval);
        this.totalIn+=Number(amountval)
        console.log('check Point',this.InItems);
        amount.value='';
        label.value='';
        if(this.type='edit'){
          this.update();
        }
      }
  
  }

  addOutItems(amount:HTMLInputElement,label:HTMLInputElement){

    if(amount.value)
      {
        let amountval:any=Number(amount.value);
        console.log(amountval);
        let labelval:any=label.value;
      this.OutItems.push({amount:amountval,label:labelval});
      this.total-=Number(amountval);
      this.totalOut+=Number(amountval)
      amount.value='';
        label.value='';
        if(this.type='edit'){
          this.update();
        }
    }
  }

  removeInItem(item:any){
    let index = this.InItems.indexOf(item);
    if (index > -1) {
      this.InItems.splice(index, 1);
    }
    this.total-=Number(item.amount);
    if(this.type='edit'){
      this.update();
    }
  }

  removeOutItem(item:any){
    let index = this.OutItems.indexOf(item);
    if (index > -1) {
      this.OutItems.splice(index, 1);
    }
    this.total+=Number(item.amount);
    if(this.type='edit'){
      this.update();
    }
  }

  
  create(name:HTMLInputElement) {
    this.afs.collection('estimates').add({
      name:name.value,
      OutItems: this.OutItems,
      InItems: this.InItems,
      createdAt: new Date(),
      updatedAt: new Date(),

    }).then((res:any) => {
      console.log(res);
      this.router.navigate(['/manage/money/estimation/'+res.id]);
    }).catch((err:any) => {
      console.log(err);
    
    })
  }

  update() {

    this.afs.collection('estimates').doc(this.currentId).update({
      name:this.name,
      OutItems: this.OutItems,
      InItems: this.InItems,
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
      this.lastUpdated=res.updatedAt;
      this.router.navigate(['/manage/money/estimation/'+this.currentId]);
    }).catch((err:any) => {
      console.log(err);
    })
  }

  getEstimates(id:any) {
    this.afs.collection('estimates').doc(id).valueChanges({idField: 'id'}).subscribe((res:any) => {
      console.log('check Point',res);
      this.InItems=res.InItems;
      this.OutItems=res.OutItems;
      this.name=res.name;
      this.lastUpdated=res.updatedAt;
      this.totalIn= res.InItems.reduce((accumulator:any, currentValue:any) => {
        return accumulator + currentValue.amount;
      }, 0);
      this.totalOut = res.OutItems.reduce((accumulator:any, currentValue:any) => {
        return accumulator + currentValue.amount;
      }, 0);
      this.total=this.totalIn-this.totalOut;
    },
    (err:any)=>{

    });
  }

  gotoList(){
    this.router.navigate(['/manage/money/estimation-list']);
  }
  createNew(){
    this.router.navigate(['/manage/money/estimation/new']);
  }


  delete(){
    if(this.currentId){
    if(window.confirm('Are you sure you want to delete?')) {
      console.log(this.currentId);
      this.afs.collection('estimates').doc(this.currentId).delete().then((res:any) => {
        console.log(res);
        this.router.navigate(['/manage/money/estimation/new']);
      }).catch((err:any) => {
        console.log(err);
      })
    }
  }
  }


}
