import { Component, OnInit } from '@angular/core';
import { FileuploaderComponent } from 'src/app/manage/general/fileuploader/fileuploader.component';
import { MatDialog } from '@angular/material/dialog';
  import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss']
})
export class BooksFormComponent implements OnInit {

  constructor(  private dialog:MatDialog,private afs:AngularFirestore,private router:Router) { }
  name: string = '';
  price: number | null = null;
  description: string = '';
  semester: string = '';
  branch: string = '';
  image: File | null = null;
  code: string = '';
  ngOnInit(): void {
  }

 

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  onSubmit() {
    // Handle the form submission logic here
    console.log('Book details:', {
      name: this.name,
      price: this.price,
      description: this.description,
      semester: this.semester,
      branch: this.branch,
      image: this.image
    });

    if(this.image && this.name && this.price && this.description && this.semester && this.branch)
      {
        this.createRecord();
      }
      else{
        alert("Please fill all the details");
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
         console.log(res);
         this.image=res.url;
        }
      })
  }


  createRecord(){
    
    this.afs.collection('books').add({
      code:this.code,
      name: this.name,
      price: this.price,
      image: this.image,
      branch: this.branch,
      semester: this.semester,
      description: this.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
      this.router.navigate(['/manage/books']);
    }
    ).catch((err:any) => {
      console.log(err);
    }
    );

  }



}


