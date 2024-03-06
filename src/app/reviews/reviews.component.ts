import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../auth/service/api.service';
import { Author, Review } from 'src/models/Review';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../auth/service/user-store.service';
import { AuthService } from '../auth/service/auth.service';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
    reviews: Review[] = []
    id: number = 0;
    username: string = "";
    content: string = '';
    ratings: number [] = Array.from({ length: 10 }, (_, index) => index + 1);
    rating: number = 1;
    @Input() movieId: number = 0;
    @Input() movieTitle: string = "";
    constructor(private apiservice: ApiService,
      private toast: NgToastService,
      private userstore: UserStoreService,
      private authservice: AuthService,)
    {

    }
  ngOnInit(): void {
    this.apiservice.GetReviewsByMovieId(this.movieId).subscribe({
      next: (r) => this.reviews = r,
      error: () => this.toast.error({detail: 'Error', summary: 'Error loading reviews', duration: 5000}),
    });
    this.userstore.getUsernameFromStore().subscribe(value => {
      this.id = this.authservice.decodedToken().unique_name[1],
      this.username = this.authservice.decodedToken().unique_name[0]
    });
  }
  SubmitReview(): void 
  {
    const author: Author = {
      id: this.id,
      name: this.username,
      rating: this.rating
    }
    const newReview: Review = {
      author_details: author,
      content: this.content,
      movieId: this.movieId,
      movieTitle: this.movieTitle
    }
    this.apiservice.PostReviewsByMovieId(this.movieId, newReview).subscribe({
      error: (e) => this.toast.error({detail: e.error, summary: 'Error loading reviews', duration: 5000})
    }
    )
    this.apiservice.GetReviewsByMovieId(this.movieId).subscribe({
      next: (r) => this.reviews = r,
      error: () => this.toast.error({detail: 'Error', summary: 'Error loading reviews', duration: 5000}),
    });
  }
}
