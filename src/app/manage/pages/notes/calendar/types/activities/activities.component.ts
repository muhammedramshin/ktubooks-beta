import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
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
      type: {
        title: 'Activity Type'
      },
      position: {
        title: 'Position'
      },
      icon: {
        title: 'Icon'
      },
    }
  };
  constructor(private afs:AngularFirestore) { }
  activitytypes:any;
  ngOnInit(): void {
    this.getTypes();
  }


  getTypes() {
    //  get customers where is_active is true
      this.afs.collection('activitytypes').valueChanges({idField:'id'}).subscribe((res:any) => {
        console.log(res);
        this.activitytypes = res;
        this.source.load(this.activitytypes);
           })

           console.log(this.activitytypes);
     }
  addType(event:any) {
    console.log(event);
    this.afs.collection('activitytypes').add({
      type: event.newData.type,
      createdAt: new Date(),
      is_active: true,
      position: event.newData.position,
      icon: event.newData.icon,
    }).then((res:any) => {
      event.confirm.resolve(event.newData);
    }
    ).catch((err:any) => {
      event.confirm.reject();
    }
    )
  }

  editType(event:any) {
    console.log(event.data.id);
    this.afs.collection('activitytypes').doc(event.data.id).update({
      type: event.newData.type,
      position: event.newData.position,
      icon: event.newData.icon,
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
    this.afs.collection('activitytypes').doc(event.data.id).update({
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
