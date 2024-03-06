import { Component, OnInit } from '@angular/core';
import { Review } from 'src/models/Review';
import { ApiService } from '../auth/service/api.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit{
  myReviews: Review[] = [];

  constructor(private apiService: ApiService, 
    private toast:NgToastService,
    private authservice: AuthService) {
    
  }
  ngOnInit(): void {
    this.onGetUserReviews();
  }
  onGetUserReviews():void 
  {
    this.apiService.GetUserReviewsByUserId(this.authservice.decodedToken().unique_name[1]).subscribe({
      next: (r) => this.myReviews = r,
      error: (e) => this.toast.error({detail: 'Error', summary: e.message, duration: 5000})
    })
  }
}
