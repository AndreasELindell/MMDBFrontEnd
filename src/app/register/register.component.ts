import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import FormHelper from '../helpers/formhelper';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  type: string = "password";
  isPasswordShowing: boolean = false;
  eyeIcon: string = "fa-solid fa-eye-slash"

  signUpForm!: FormGroup
  constructor(
    private serivce: AuthService, 
    private fb: FormBuilder, 
    private router: Router, 
    private toast:NgToastService) {}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
  onSignUp():void{

    if(this.signUpForm.valid){
      this.serivce.Register(this.signUpForm.value).subscribe({
        next: (r) => { 
          this.signUpForm.reset();
          this.toast.success({detail: "Success!", summary: r.message, duration: 5000});
          this.router.navigate(["/login"]);
        },
        error: (e) => { 
          this.toast.error({detail: "Error", summary: e.error.message, duration: 100000});
        }
      });
    } 
    else{
      FormHelper.markFormDirty(this.signUpForm);
    }
  }
  hideShowPassword():void {
    this.isPasswordShowing = !this.isPasswordShowing;
    this.isPasswordShowing ? this.eyeIcon = "fa-solid fa-eye" : this.eyeIcon = "fa-solid fa-eye-slash";
    this.isPasswordShowing ? this.type = "text" : this.type = "password";

  }
}
