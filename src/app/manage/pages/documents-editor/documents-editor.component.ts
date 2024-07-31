import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-documents-editor',
  templateUrl: './documents-editor.component.html',
  styleUrls: ['./documents-editor.component.scss']
})
export class DocumentsEditorComponent implements OnInit {
  actiontype: any;
  activeid: any;

  constructor(private afs:AngularFirestore,private router:Router,private route:ActivatedRoute) { }
  doctitle:any;
  quillConfig={
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    
        ['clean'],                                         // remove formatting button
  
        ['link'],
        ['link', 'image', 'video']  
      ],
      
    },

  };
  docdata:any="";
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Access and store the 'type' and 'id' parameters
      this.actiontype = params['type'];

     
      console.log(this.actiontype);
      if(this.actiontype=='edit'||this.actiontype=='view'){
        this.activeid = params['id'];
        this.getdocByID();
      }
      // You can perform any additional actions here based on the parameters
      // For example, fetching data based on the type and id
    });


  
   
  }

  getdocByID(){
    this.afs.collection('documents').doc(this.activeid).valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
      this.doctitle=res.title;
      this.docdata=res.data;
    })
  } 



  saveDoc(){
    if(this.actiontype=='create'){
      this.create({title:this.doctitle,data:this.docdata});
      this.docdata='';
      this.doctitle='';
    }
    else if(this.actiontype=='edit'){
      this.update({title:this.doctitle,data:this.docdata,id:this.activeid});
      this.docdata='';
      this.doctitle='';
    }
 

  }

  create(data:any){
    this.afs.collection('documents').add({
      title:data.title,
      data:data.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
      this.backToDocs();
    }
    ).catch((err:any) => {
      console.log(err);
    }
    );
  }

  update(data:any){
    this.afs.collection('documents').doc(data.id).update({
      title:data.title,
      data:data.data,
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
      this.backToDocs();
    }
    ).catch((err:any) => {
      console.log(err);
    }
    );
  }
  updateAndStay(){
    let data={title:this.doctitle,data:this.docdata,id:this.activeid};
    this.afs.collection('documents').doc(data.id).update({
      title:data.title,
      data:data.data,
      updatedAt: new Date(),
    }).then((res:any) => {
      console.log(res);
     
    }
    ).catch((err:any) => {
      console.log(err);
    }
    );
  }








  backToDocs(){
    this.router.navigate(['/manage/documents']);
  }

}
