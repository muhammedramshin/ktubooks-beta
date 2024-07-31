import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor( private afs: AngularFirestore) { }
  books:any[]=[]
  ngOnInit(): void {
    this.getbooks();
  }

  getbooks(){
    this.afs.collection('books').valueChanges({idField:'id'}).subscribe((res:any) => {
      console.log(res);
      this.books=res;
    })
  }

}
