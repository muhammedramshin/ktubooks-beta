import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  version = environment.version;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  isExpanded = true;
  isExpanded1 = true;
  showSubmenu: boolean = false;
  showSubmenu1: boolean = false;
  showSubmenuActive: string = '';
  isShowing = false;
  isShowing1 = false;
  showSubSubMenu: boolean = false;


  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }


  constructor(private breakpointObserver: BreakpointObserver,private auth:AngularFireAuth,private router:Router,private location: Location) { }

  ngOnInit(): void {
  }

  toggleIfMobile() {
    this.isHandset$.subscribe(res => {
      console.log("res", res);
      if (res) {
        // this.sidenav?.toggle();
        if(this.sidenav?.opened){
          this.sidenav?.close();
        }
        else{
          this.sidenav?.open();
        }
      }
      else {
        this.sidenav?.open();
        this.isExpanded=!this.isExpanded;
      }
    });
  }

  async handleSignOut() {
    // console.log("logout");
    if(window.confirm("Are you sure you want to logout?")){
    try {
      const res = await this.signOut();
      this.router.navigateByUrl('/login');
    } catch (error) {
    }
  }
  }


  signOut(){
    return this.auth.signOut();
  }


  exitApp() {
    this.location.back();
    setTimeout(() => {
      this.location.go('/'); // Navigate back to the initial route
    }, 0);
  }
}
