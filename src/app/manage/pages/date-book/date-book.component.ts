import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalDataSource } from 'ng2-smart-table';
import { DatepickercustomComponent } from '../../general/datepickercustom/datepickercustom.component';
import { DatepickereditorComponent } from '../../general/datepickereditor/datepickereditor.component';
@Component({
  selector: 'app-date-book',
  templateUrl: './date-book.component.html',
  styleUrls: ['./date-book.component.scss']
})
export class DateBookComponent implements OnInit {

  constructor(private afs:AngularFirestore) { }
  datesSource:any=new LocalDataSource();
  dateSettings = {
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
        title: 'Label'
      },
      date: {
        title: 'Date',
        renderComponent: DatepickercustomComponent,
        editor: {
          type: 'custom',
          component: DatepickereditorComponent,
        },
      },
    }
  };
  ngOnInit(): void {
    this.getdatebooks();
  }


  createRecord(event:any){
    console.log(event);
    event.confirm.resolve(event.newData);

    this.afs.collection('datebooks').add({
      name: event.newData.name,
      date: event.newData.date,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
      event.confirm.resolve(event.newData);
    }
    ).catch((err:any) => {
      console.log(err);
      event.confirm.reject();
    }
    );

  }


  getdatebooks(){
    this.afs.collection('datebooks').valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
      this.datesSource.load(res);
    })
  }

editRecord(event:any){
  console.log(event);
  event.confirm.resolve(event.newData);

  this.afs.collection('datebooks').doc(event.data.id).update({
    name: event.newData.name,
    date: event.newData.date,
    updatedAt: new Date(),
  }).then((res:any) => {
    console.log(res);
    event.confirm.resolve(event.newData);
  }
  ).catch((err:any) => {
    console.log(err);
    event.confirm.reject();
  }
  );
}

deleteRecord(event:any){
  console.log(event);
  event.confirm.resolve(event.newData);
  this.afs.collection('datebooks').doc(event.data.id).delete().then((res:any) => {
    console.log(res);
    event.confirm.resolve(event.newData);
  }
  ).catch((err:any) => {
    console.log(err);
    event.confirm.reject();
  }
  );
}
}
