import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  bookcode: any;
  bookdata: any;
  userForm: FormGroup;
  submitted = false;

  constructor( private afs: AngularFirestore,private router:Router,private route:ActivatedRoute,private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      remarks: ['']
    });
   }

  ngOnInit(): void {
    this.bookcode=this.route.snapshot.paramMap.get('id');
    this.getBooks(this.bookcode);
   
  }
  get formControls() {
    return this.userForm.controls;
  }

  getBooks(bookcode: string): void {
    this.afs.collection('books', ref => ref.where('code', '==', bookcode)).valueChanges({ idField: 'id' }).subscribe(
      (res: any[]) => {
        console.log(res);
        this.bookdata = res[0];
      },
      (error) => {
        console.error("Error fetching books: ", error);
      }
    );
  }


  

 

  onSubmit() {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.userForm.invalid) {
      return;
    }

    // Process the form data here
    console.log(this.userForm.value);
  }
}



