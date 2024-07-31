import { Component, OnInit ,ElementRef, Renderer2  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { GeneralService } from 'src/app/services/general.service';
import { MatDialog } from '@angular/material/dialog';
import { CalculatorComponent } from '../calculator/calculator.component';


@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {

  constructor(private afs: AngularFirestore,private renderer: Renderer2,private service:GeneralService,private dialog:MatDialog) { }
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  isUpdating: boolean = false;
  note: any;
  noteId: any;
  noteslist: any;
  selectTab:number=0;
  editorContent:any="<h1>invitees</h1><ol><li>sakaka</li><li>akaakla</li><li>ajaja</li><li>jajaj</li><li>ajajaj</li><li><br></li></ol>";

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
    this.getNotes();
  }


  quillvalue(){
    console.log(this.editorContent);
  }
  create() {

    this.afs.collection('moneynotes').add({
      note: this.note,
      createdAt: new Date(),
      updatedAt: new Date(),

    }).then((res: any) => {
      console.log(res);

    }).catch((err: any) => {
      console.log(err);

    })
  }


  getNotes() {
    this.afs.collection('moneynotes').valueChanges({ idField: 'id' }).subscribe((res: any) => {
      console.log(res);
      this.note = res[0].note;
      this.noteId = res[0].id;
      this.noteslist = res;
    });

  }

  update(data: any) {
   
    console.log('check Point',data);
    
    this.afs.collection('moneynotes').doc(data?.id).update({
      note: data?.note,
      updatedAt: new Date(),
    }).then((res: any) => {
      console.log(res);
      // Set the active tab back to the current index after the update
      this.service.openSnackBar('Updated', 'Close');
    }).catch((err: any) => {
      console.log(err);
      this.service.openSnackBar('Error', 'Close');
    });
  }



  clearNotes(data: any) {
    if (window.confirm('Are you sure you want to clear all notes?'))
    {
      this.afs.collection('moneynotes').doc(data?.id).update({
        note: '',
        updatedAt: new Date(),
      }).then((res: any) => {
        console.log(res);

      }).catch((err: any) => {
        console.log(err);

      })
    }
  }

  selectedTab(index:number){

    this.selectTab=index;
  }

  openCalculator(){

    const dialog=this.dialog.open(CalculatorComponent,
      {
        panelClass:'calculator-dialog',
        maxWidth:'100vw',
        maxHeight:'100vh',
      }
      );

  }


  

}
