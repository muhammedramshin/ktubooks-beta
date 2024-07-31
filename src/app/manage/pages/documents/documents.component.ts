import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  @ViewChild('tabGroup') MatTabGroup: MatTabGroup | any;
  alldocs: any;
  docsTemp: any;
  actiontype:any='create';
  activeid: any;
  search: string='';
  editorContent:any="<h1>invitees</h1><h2>hello</h2>";

  constructor(private afs:AngularFirestore,private router:Router) { }
  docdata:any="<p>am on doc dataupdate</p><ol><li>aaaaaa</li><li>new data</li></ol><h1>hello</h1>";
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
  
  ngOnInit(): void {
    this.getdocs();
  }

  gotoEditor() {
    // Switch to the 'Editor' tab
    this.MatTabGroup.selectedIndex = 1;
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

  editDoc(data:any){
    this.actiontype='edit';
    this.activeid=data.id;
    this.doctitle=data.title;
    this.docdata=data.data;
    console.log(data);
    this.MatTabGroup.selectedIndex = 1;
  }


  edit(data:any){
    this.router.navigate(['/manage/documents/edit',data.id]);
  }
  view(data:any){
    this.router.navigate(['/manage/documents/view',data.id]);
  }
  createnew(){
    this.router.navigate(['/manage/documents/create']);
  }

  create(data:any){
    this.afs.collection('documents').add({
      title:data.title,
      data:data.data,
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

  update(data:any){
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

  getdocs(){
    this.afs.collection('documents').valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
      this.alldocs=res;
      this.docsTemp=res;
    })
  } 


  delete(id:any){
    if(window.confirm('Are you sure you want to delete this document?')){
    this.afs.collection('documents').doc(id).delete().then(res => {
      console.log(res);
      this.getdocs();
    })
    }
  }

  searchFile(){
    if(this.search==''){
      this.alldocs=this.docsTemp;
    }
    else{
      this.alldocs=this.docsTemp;
      let files=this.alldocs.filter((file:any) => {
        return file.title.toLowercase().includes(this.search.toLowerCase())
      })
      
      console.log(files);

      this.alldocs=files
    }

  }

}
