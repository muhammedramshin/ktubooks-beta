import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(private afs:AngularFirestore,private service:GeneralService) { }

  allNotes:any[]=[]
  ngOnInit(): void {
    this.getCalendarData();
  }



  getCalendarData() {
    this.afs.collection('calendar').valueChanges({ idField: 'id' }).subscribe((data) => {
      console.log("Notes model", data);
      let notes=data.filter((item:any)=>{
        return item?.notes?.length>0
      });

      

      console.log("Notes model", notes);
      this.allNotes=notes
      this.allNotes= this.allNotes.sort((a, b) => {
        return b.date - a.date;
    });
    console.log("sorted model", notes);
  
    })
  }


  exportToPdf() {

    let notesdata: any[] = [];

    // Iterate over allNotes
    this.allNotes.forEach((item: any) => {
      // Iterate over each note in the current item
      item?.notes.forEach((notesel: any) => {
        // Create a new temp object for each note
        let temp: any = {
          createdAt: item?.date,
          note: notesel.title // Set the note property for the current temp object
        };
        // Push the temp object into the notesdata array
        notesdata.push(temp);
      });
    });
    


    console.log(notesdata)

    if(notesdata.length>0){
  
    this.service.generateNotesPdf(notesdata,'notes');
    }
    else{
      alert('No Data Found');
      
    }
  }

}
