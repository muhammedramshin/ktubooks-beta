import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalDataSource } from 'ng2-smart-table';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-quick-copy',
  templateUrl: './quick-copy.component.html',
  styleUrls: ['./quick-copy.component.scss']
})
export class QuickCopyComponent implements OnInit {

  constructor(private afs:AngularFirestore,private service:GeneralService) { }
  quickcopySource:any=new LocalDataSource();
  quickcopySettings = {
    mode: 'inline',
    actions: {
      position: 'right',
      add: true,
      edit: true,
      delete: true,
      custom: [
        {
          name: 'copy',
          title: '<i class="fa fa-clipboard" aria-hidden="true"></i>',
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
      name: {
        title: 'Label'
      },
      data: {
        title: 'Data',
      },
    }
  };
  ngOnInit(): void {
    this.getquickcopy();
  }


  createRecord(event:any){
    console.log(event);
    event.confirm.resolve(event.newData);

    this.afs.collection('quickcopy').add({
      name: event.newData.name,
      data: event.newData.data,
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


  getquickcopy(){
    this.afs.collection('quickcopy').valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
      this.quickcopySource.load(res);
    })
  }

editRecord(event:any){
  console.log(event);
  event.confirm.resolve(event.newData);

  this.afs.collection('quickcopy').doc(event.data.id).update({
    name: event.newData.name,
    data: event.newData.data,
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
  this.afs.collection('quickcopy').doc(event.data.id).delete().then((res:any) => {
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
      selBox.value = event.data.data;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

      this.service.openSnackBar('Copied to clipboard','OK');

    }

  }


}
