import { Component, OnInit ,Input} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-clearbutton',
  templateUrl: './clearbutton.component.html',
  styleUrls: ['./clearbutton.component.scss']
})
export class ClearbuttonComponent implements OnInit {

  constructor(private afs:AngularFirestore) { }
  title: string='';
  @Input() rowData: any;
  ngOnInit(): void {
    console.log(this.rowData);
  }
  
  onClick() {
    console.log('Custom action clicked:',this.rowData);
    if(this.rowData.loanClear == true) {
      if(window.confirm('Are you sure you want to clear this? '+this.rowData.loanTo+' '+this.rowData.amount)){
        this.afs.collection('moneytransactions').doc(this.rowData.id).update({
          loanClear: false,
          updateAt: new Date(),
        }).then(() => {
          console.log('success');
        }
        ).catch((error) => {
          console.log(error);
        }
        )
      }
  } else {
    if(window.confirm('Are you sure you want to undo this ? '+this.rowData.loanTo+' '+this.rowData.amount)){
    this.afs.collection('moneytransactions').doc(this.rowData.id).update({
      loanClear: true,
      updateAt: new Date(),
    }).then(() => {
      console.log('success');
    }
    ).catch((error) => {
      console.log(error);
    }
    )
  }

  }
  }

}
