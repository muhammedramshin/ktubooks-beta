import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  
  onSubmit(f: NgForm) {
    const { email, password } = f.form.value;
   
    
    
    //TODO: do your checking here
    this.auth
      .signIn(email, password)
      .then((res:any) => {
      
       console.log("log value ::",this.auth.loggedIn);
       
      
        this.auth.loggedIn.next(true);
      
        console.log("log value after::",this.auth.loggedIn);
        localStorage.setItem("self",email);
        localStorage.setItem("aself",password);
        console.log("res");
        
        this.router.navigateByUrl('/manage');
        
       
       
        
      })
      .catch((err:any) => {
        console.log(err.message);
        // this.toastr.error('SignIn failed',err.message);
      });
  }

}

