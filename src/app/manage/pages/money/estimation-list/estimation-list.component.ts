import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estimation-list',
  templateUrl: './estimation-list.component.html',
  styleUrls: ['./estimation-list.component.scss']
})
export class EstimationListComponent implements OnInit {

  constructor(private afs:AngularFirestore,private router:Router) { }
  estimates:any;
  ngOnInit(): void {
    this.getEstimates();
  }

  getEstimates() {
    this.afs.collection('estimates').valueChanges({idField: 'id'}).subscribe((res:any) => {
      console.log('check Point',res);
      this.estimates=res;
    },
    (err:any)=>{

    });
  }
  
  edit(item:any){
    this.router.navigate(['/manage/money/estimation/',item.id]);
  }

  delete(item:any){
    if(window.confirm('Are you sure you want to delete?')) {
      console.log(item);
      this.afs.collection('estimates').doc(item.id).delete().then((res:any) => {
        console.log(res);
      }).catch((err:any) => {
        console.log(err);
      })
    }
    
  }
}
