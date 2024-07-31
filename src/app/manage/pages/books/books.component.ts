import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalDataSource } from 'ng2-smart-table';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(private afs:AngularFirestore,private service:GeneralService) { }
  datesSource:any=new LocalDataSource();
  dateSettings = {
    mode: 'inline',
    actions: {
      position: 'right',
      add: true,
      edit: true,
      delete: true,
      custom: [
        {
          name: 'copy',
          title: '<i class="fa fa-copy" aria-hidden="true"></i>',
        },
      ],
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
      code: {
        title: 'Code'
      },
      name: {
        title: 'Name'
      },
      price:{
        title: 'Price'
      }
      ,
      branch:{
        title: 'Branch'
      },
      semester:{
        title: 'Semester'
      },
      description:{
        title: 'Description'
      },
      image:{
        title: 'Image'
      }
    }
  };
  ngOnInit(): void {
    this.getbooks();
  }


  createRecord(event:any){
    console.log(event);
    event.confirm.resolve(event.newData);

    this.afs.collection('books').add({
      name: event.newData.name,
      price: event.newData.price,
      image: event.newData.image,
      branch: event.newData.branch,
      semester: event.newData.semester,
      description: event.newData.description,
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


  getbooks(){
    this.afs.collection('books').valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
      this.datesSource.load(res);
    })
  }

editRecord(event:any){
  console.log(event);
  event.confirm.resolve(event.newData);

  this.afs.collection('books').doc(event.data.id).update({
    name: event.newData.name,
    contact: event.newData.contact,
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
  this.afs.collection('books').doc(event.data.id).delete().then((res:any) => {
    console.log(res);
    event.confirm.resolve(event.newData);
  }
  ).catch((err:any) => {
    console.log(err);
    event.confirm.reject();
  }
  );
}


customAction(event:any){
  console.log(event);
  if(event.action === 'copy'){
    console.log('copy');

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = event.data.contact;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.service.openSnackBar('Copied to clipboard','OK');

  }

}

}