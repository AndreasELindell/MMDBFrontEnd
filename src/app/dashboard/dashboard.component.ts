import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/models/Movie';
import { Director } from 'src/models/Director';
import { ApiService } from '../auth/service/api.service';
import { NgToastService } from 'ng-angular-popup';
import { Review } from 'src/models/Review';
import { AuthService } from '../auth/service/auth.service';
import { WishlistItem } from 'src/models/WishlistItem';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  movies: Movie[] = [];
  movie = {} ;
  wishlist: WishlistItem[] = [];
  images: string[] = [];
  myReviews: Review[] = [];
  userId = this.authservice.decodedToken().unique_name[1];
  constructor(private apiService: ApiService, 
    private toast:NgToastService,
    private authservice: AuthService) { }
  ngOnInit(): void {
    this.onGetAllMovies();
    this.onGetUserReviews();
    this.onGetUserWishlist();
  }

  onGetAllMovies(): void
  {
    this.apiService.GetMovies().subscribe({
      next: (m) => this.movies = m,
      error: (e) => this.toast.error({detail: 'Error', summary: e.message, duration: 5000}),
      complete: () =>  this.images = [
        `https://image.tmdb.org/t/p/w500${this.movies[0]?.backdrop_path}`, 
        `https://image.tmdb.org/t/p/w500${this.movies[1]?.backdrop_path}`, 
        `https://image.tmdb.org/t/p/w500${this.movies[2]?.backdrop_path}`]
    });
  }
  onGetUserReviews():void 
  {
    this.apiService.GetUserReviewsByUserId(this.authservice.decodedToken()?.unique_name[1]).subscribe({
      next: (r) => this.myReviews = r,
      error: (e) => this.toast.error({detail: 'Error', summary: e.message, duration: 5000})
    })
  }
  onGetUserWishlist(): void
  {
    this.apiService.GetUserWishlistByUserId(this.authservice.decodedToken()?.unique_name[1]).subscribe({
      next: (r) => this.wishlist = r,
      error: (e) => this.toast.error({detail: 'Error', summary: e.message, duration: 5000})
    });
  }
  AddWishlistItemToUser(movie: Movie):void
  {
    const wishlistItem: WishlistItem = 
    {
      id: 0,
      movie: movie,
      userId: this.authservice.decodedToken()?.unique_name[1],
      watched: false
    }
    this.apiService.PostUserWishlistItem(wishlistItem).subscribe({
      next: (r) => this.toast.success({detail: 'Added to watchlist!', summary: r.movie.title, duration: 5000}),
      error: (e) => this.toast.error({detail: 'Error', summary: e.message, duration: 5000}),
      complete: () => {this.onGetUserWishlist(), this.toast.success({detail: 'Added to watchlist!', duration: 5000})}
    })
  }
}

