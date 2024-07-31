import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-expence-types',
  templateUrl: './expence-types.component.html',
  styleUrls: ['./expence-types.component.scss']
})
export class ExpenceTypesComponent implements OnInit {
  expencetypes: any;
  source: LocalDataSource = new LocalDataSource();
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
      expencetype: {
        title: 'Expence Type'
      },
      position: {
        title: 'Position'
      },
    }
  };
  constructor(private afs:AngularFirestore) { }

  ngOnInit(): void {
    this.getTypes();
  }

   getTypes() {
    //  get customers where is_active is true
      this.afs.collection('expencetypes').valueChanges({idField:'id'}).subscribe((res:any) => {
        console.log(res);
        this.expencetypes = res;
        this.source.load(this.expencetypes);
           })

           console.log(this.expencetypes);
     }

     addType(event:any) {
      console.log(event);
      this.afs.collection('expencetypes').add({
        expencetype: event.newData.expencetype,
        position: event.newData.position,
        createdAt: new Date(),
        is_active: true
      }).then((res:any) => {
        event.confirm.resolve(event.newData);
      }
      ).catch((err:any) => {
        event.confirm.reject();
      }
      )
    }

    editType(event:any) {
      console.log(event);
      this.afs.collection('expencetypes').doc(event.data.id).update({
        expencetype: event.newData.expencetype,
        position: event.newData.position,
        updatedAt: new Date(),
      }).then((res:any) => {
        event.confirm.resolve(event.newData);
      }
      ).catch((err:any) => {
        event.confirm.reject();
      }
      )
    }

    deleteType(event:any) {
      console.log(event);
      this.afs.collection('expencetypes').doc(event.data.id).update({
        is_active: false,
        deletedAt: new Date(),
      }).then((res:any) => {
        event.confirm.resolve(event.newData);
      }
      ).catch((err:any) => {
        event.confirm.reject();
      }
      )
    }

}
