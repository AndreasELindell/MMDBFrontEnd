import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../auth/service/auth.service';
import { UserStoreService } from '../auth/service/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  public username: string = "";
  public role: string = "";
  
  constructor(private toast:NgToastService, 
    private authService: AuthService,
    private userstore: UserStoreService,
    private router: Router){

  }
  searchString: string = "";
  ngOnInit(): void {
    this.userstore.getUsernameFromStore().subscribe(value =>{
      let usernameFromToken = this.authService.getUsernameFromToken();
      this.username = value || usernameFromToken[0];
    })

    this.userstore.getRoleFromStore().subscribe(value =>{
      let roleFromToken = this.authService.getRoleFromToken();
      this.role = value || roleFromToken;
    })
  }
  signout(){
    this.toast.info({detail: 'Logged out', summary: "You are now signed out", duration: 5000})
    this.authService.SignOut();
  }
  searchMovies(){
    if(this.searchString.length > 0)
    {
      this.router.navigate(['/search', this.searchString]).then(() => {
        
      });
    }
    else
    {
      this.toast.error({detail: 'Empty search', summary: 'Please search for something', duration: 5000})
    }
    
  }
}

