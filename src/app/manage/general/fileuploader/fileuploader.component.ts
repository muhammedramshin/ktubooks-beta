import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.scss']
})
export class FileuploaderComponent implements OnInit {

  constructor( private storage: AngularFireStorage,private dialogRef: MatDialogRef<FileuploaderComponent>) { }
  filename:any;
  label:any;
  type:any;

  fileUrl:any;
  uploadedFile: any;

  labels:any[]=['file','image'];

  loading:boolean=false;

  ngOnInit(): void {
  }

  fileupload(event:any){
    this.loading=true;
    console.log(event);
   this.uploadFile(event,'test').then((res:any)=>{
      console.log(res);
      this.uploadedFile=res;
      this.loading=false;
    }
    ).catch((err:any)=>{
      console.log(err);
    }
    );
  }


  save(){

    if(this.uploadedFile){

      this.dialogRef.close(
        {
          status:true,
          name:this.filename,
          label:this.label,
          type:this.uploadedFile.type,
          url:this.uploadedFile.url
        }
      );
    }
   
  }

  cancel(){
    this.dialogRef.close(
      {
        satus:false
      }
    );
  }



  uploadFile(event: any, path: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      const filetype = this.typecheck(file.type);
      const filename = file.name;

      let filePathdir = path + '/' + file.name;
      const filePath = filePathdir;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      let response: any;
      task.then((res) => {
        console.log(res);
        fileRef.getDownloadURL().subscribe((res) => {
          console.log(res);
          response = res;

          resolve({ 'type': filetype, 'url': res, 'name': filename, 'fileref': filePath });
        }
        );
      }
      );
    });
  }




  typecheck(type: any) {
    
    if (type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return 'xlsx';
    }
    else if (type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return 'docx';
    }
    else if (type == 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
      return 'pptx';
    }
    else if (type == 'application/vnd.ms-excel') {
      return 'xls';
    }
    else if (type == 'application/vnd.ms-powerpoint') {
      return 'ppt';
    }
    else if (type == 'application/msword') {
      return 'doc';
    }
    else if (type == 'application/vnd.ms-access') {
      return 'mdb';
    }
    else if (type == 'application/pdf') {
      return 'pdf';
    }
    else if (type == 'image/jpeg') {
      return 'jpeg';
    }
    else if (type == 'image/png') {
      return 'png';
    }
    else if (type == 'image/gif') {
      return 'gif';
    }
    else if (type == 'image/bmp') {
      return 'bmp';
    }
    else if (type == 'image/tiff') {
      return 'tiff';
    }
    else if (type == 'image/svg+xml') {
      return 'svg';
    }
    else if (type == 'text/plain') {
      return 'txt';
    }
    else if (type == 'text/html') {
      return 'html';
    }
    else if (type == 'text/css') {
      return 'css';
    }
    else if (type == 'text/javascript') {
      return 'js';
    }
    else if (type == 'application/json') {
      return 'json';
    }
    else if (type == 'application/zip') {
      return 'zip';
    }
    else if (type == 'application/x-rar-compressed') {
      return 'rar';
    }
    else {
      return 'unknown';
    }
  }

}
