import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalDataSource } from 'ng2-smart-table';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-cred-book',
  templateUrl: './cred-book.component.html',
  styleUrls: ['./cred-book.component.scss']
})
export class CredBookComponent implements OnInit {
  credSource:any=new LocalDataSource();
  usenameKey: any="YiHHHvvvvYYkskskl3456789012kkkks3456";
  passwordKey: any="YiHHHvvvvYtyytghsbjysees7890jjj12kkkks3456";
  constructor(private afs:AngularFirestore,private service:GeneralService) { }
  credSettings = {
    mode: 'inline',
    actions: {
      position: 'right',
      add: true,
      edit: true,
      delete: true,
      custom: [
        {
          name: 'copy',
          title: '<i class="fa fa-user" aria-hidden="true"></i>',
        },
        {
          name: 'password',
          title: '<i class="fa fa-key" aria-hidden="true"></i>',
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
      username: {
        title: 'username',
      },
      password: {
        title: 'Password',
      },
    }
  };
  ngOnInit(): void {
    this.getcredbook();
  }



  createRecord(event:any){
    console.log(event);
    event.confirm.resolve(event.newData);

    let encUsername=this.encryptText(event.newData.username,this.usenameKey);
    let encpassword=this.encryptText(event.newData.password,this.passwordKey);
    console.log("after :",encUsername);
    console.log("after :",encpassword);
  

    this.afs.collection('cred-book').add({
      name: event.newData.name,
      username: encUsername,
      password: encpassword,
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


  getcredbook(){
    this.afs.collection('cred-book').valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
      this.credSource.load(res);
    })
  }

editRecord(event:any){
  console.log(event);
  event.confirm.resolve(event.newData);

  this.afs.collection('cred-book').doc(event.data.id).update({
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
  if(window.confirm("Confirm Delete")){

 
  console.log(event);
  event.confirm.resolve(event.newData);
  this.afs.collection('cred-book').doc(event.data.id).delete().then((res:any) => {
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

  customAction(event:any){
    console.log(event);

    let password = this.decryptText(event.data.password,this.passwordKey);
    let username=this.decryptText(event.data.username,this.usenameKey);

    //take window input and copy to clipboard

    let pin = prompt("Enter your pin to continue");

    if(pin === '400'){

    if(event.action === 'copy'){
      console.log('copy');

      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = username;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

      this.service.openSnackBar('username to clipboard','OK');

    }
    else if(event.action === 'password'){
      console.log('copy');

      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = password;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

      this.service.openSnackBar('password to clipboard','OK');
    }

  }
  else{
    this.service.openSnackBar('Invalid pin','OK');
  }
  }

   encryptText(text:any, key:any) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      let keyChar = key.charCodeAt(i % key.length);
      let encryptedChar = charCode ^ keyChar;
      result += String.fromCharCode(encryptedChar);
    }
    return result;
  }

   decryptText(text:any, key:any) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      let keyChar = key.charCodeAt(i % key.length);
      let decryptedChar = charCode ^ keyChar;
      result += String.fromCharCode(decryptedChar);
    }
    return result;
  }
}
