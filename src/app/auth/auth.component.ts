import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import FormHelper from '../helpers/formhelper';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { UserStoreService } from './service/user-store.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  type: string = "password";
  isPasswordShowing: boolean = false;
  eyeIcon: string = "fa-solid fa-eye-slash"

  loginForm!: FormGroup;
  constructor(
    private service: AuthService, 
    private fb:FormBuilder, 
    private toast:NgToastService,
    private router:Router,
    private userstore: UserStoreService) {}
  ngOnInit(): void {
    this.service.SignOut()
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    })
  }
  onLogin():void 
  {
    if(this.loginForm.valid)
    {
      this.service.Login(this.loginForm.value).subscribe({
        next: (r) => { 
          this.loginForm.reset();
          this.service.storeToken(r.accessToken);
          this.service.storeRefreshToken(r.refreshToken)
          const tokenPayload = this.service.decodedToken();
          this.userstore.setUsernameFromStore(tokenPayload.unique_name[0])
          this.userstore.setUserIdFromStore(Number(tokenPayload.unique_name[1]))
          this.userstore.setRoleFromStore(tokenPayload.role)
          this.toast.success({detail: "Success!", summary: `Logged in as ${tokenPayload.unique_name[0]}`, duration: 5000});
          this.router.navigate(["/dashboard"]);
        },
        error: (e) => { 
          this.toast.error({detail: "Error", summary: e.message, duration: 100000});
        }
      });
      
    }
    else{
      this.toast.warning({detail: "Warning", summary: "Please input username & password"})
      FormHelper.markFormDirty(this.loginForm);
    }
  }
  hideShowPassword():void {
    this.isPasswordShowing = !this.isPasswordShowing;
    this.isPasswordShowing ? this.eyeIcon = "fa-solid fa-eye" : this.eyeIcon = "fa-solid fa-eye-slash";
    this.isPasswordShowing ? this.type = "text" : this.type = "password";

  }
  
}
