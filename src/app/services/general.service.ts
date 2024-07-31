import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _snackBar:MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,
      {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      }
      );
  }

  // generatePdf(data: any[]) {
  //   const doc = new jsPDF();
  //   // Customize the layout, add data to the PDF
  //   // For example:
  //   doc.text('JSON Data', 10, 10);
  //   doc.text(JSON.stringify(data), 10, 20);
  //   doc.save('data.pdf'); // Save the PDF with a specific name
  // }


  generatePdf(data: any[],name:string) {
    let doc:any = new jsPDF('p', 'pt');
    doc.autoTable({
      head: [['Date', 'Item', 'Amount']],
      body: data.map(item => [ this.getDateFormated(item.createdAt), item.notes,item.amount])
    });


    // add a total amount at last of pdf insert as a text
    let totalAmount = data.reduce((acc, item) => acc + item.amount, 0);
    doc.text(`Total Amount: ${totalAmount}`, 25, doc.autoTable.previous.finalY + 60);


    doc.save(name+'.pdf');
  }
  generateNotesPdf(data: any,name:string) {
    let doc:any = new jsPDF('p', 'pt');
    doc.autoTable({
      head: [['Date', 'Notes']],
      body: data.map((item:any) => [ this.getDateFormated(item.createdAt), item.note])
    });

  

    doc.save(name+'.pdf');
  }


  getDateFormated(dateC:any){
    const timestamp = dateC.seconds * 1000;

const date = new Date(timestamp);

const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
const year = date.getFullYear();
 const time = date.toLocaleTimeString();
const formattedDate = `${day}/${month}/${year} ${time}`;
return formattedDate;
  }

}


