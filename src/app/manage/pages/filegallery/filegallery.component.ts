import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileuploaderComponent } from '../../general/fileuploader/fileuploader.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileviewerComponent } from '../../general/fileviewer/fileviewer.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

@Component({
  selector: 'app-filegallery',
  templateUrl: './filegallery.component.html',
  styleUrls: ['./filegallery.component.scss']
})
export class FilegalleryComponent implements OnInit {
  fileTemp: any;

  constructor(private afs:AngularFirestore,private dialog:MatDialog) { }
  allfiles:any=[];
  search:any;

  ngOnInit(): void {
    this.getfiles()

  }


  create(data:any){
    this.afs.collection('filesgallery').add({
        name:data.name,
        label:data.label,
        type:data.type,
        url:data.url,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
    }
    ).catch((err:any) => {
      console.log(err);
    }
    );
  }

  getfiles(){
    this.afs.collection('filesgallery').valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
      this.allfiles=res;
      this.fileTemp=res;
    })
  } 

  searchFile(){
    if(this.search==''){
      this.allfiles=this.fileTemp;
    }
    else{
      this.allfiles=this.fileTemp;
      let files=this.allfiles.filter((file:any) => {
        return file.name.includes(this.search)
      })
      
      console.log(files);

      this.allfiles=files
    }

  }


  fileupload(){
    console.log("fileupload");
     const dialog= this.dialog.open(FileuploaderComponent,{
        width:'500px',
        height:'350px',
      });
      dialog.afterClosed().subscribe((res:any) => {
        console.log(res);
        if(res.status)
        {
          this.create(res);
        }
      })
  }


  view(file:any){
    console.log(file);
    const dialog= this.dialog.open(FileviewerComponent,{
      width:'100%',
      height:'95%',
      data:file
    });

    dialog.afterClosed().subscribe((res:any) => {
      console.log(res);
      this.create(res)
    })
  }



deleteRecord(file:any){

  const dialogRef = this.dialog.open(ConfirmComponent,
    {
      data: {
        title: 'Delete',
        message: 'Are you sure you want to delete this file?',
        type: 'taskfiledelete',
        btnOkText: 'Delete',
        cancel:true
      }
    });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    if (result) {
      this.afs.collection('filesgallery').doc(file.id).delete().then((res:any) => {
        console.log(res);
       
      }
      ).catch((err:any) => {
    
      }
      );
    }
  });
}
  
}



