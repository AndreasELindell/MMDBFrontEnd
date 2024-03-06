import { Component, OnInit } from '@angular/core';
import { ApiService } from '../auth/service/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute } from '@angular/router';
import { Genre, Movie } from 'src/models/Movie';
import { AuthService } from '../auth/service/auth.service';
import { WishlistItem } from 'src/models/WishlistItem';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  movieId: number = 0;
  movie!: Movie;
  genres: Genre[] = [];
  images: string [] = [];
  constructor(private apiService: ApiService,
    private toast: NgToastService,
    private route: ActivatedRoute,
    private authservice: AuthService){

  }
  ngOnInit(): void {
    this.movieId = +this.route.snapshot.paramMap.get('movieId')!;
    this.onGetMovieById();
  }
  onGetMovieById(): void {
    this.apiService.GetMovieById(this.movieId).subscribe({
      next: (m) => {this.movie = m, this.genres = this.movie.genres},
      error: () => this.toast.error({detail: 'Error', summary: 'No search Results', duration: 5000}),
      complete: () => this.images = [
        `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`,
        `https://image.tmdb.org/t/p/w500${this.movie.backdrop_path}`
      ]
    });
    
  };
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
      complete: () => this.toast.success({detail: 'Added to watchlist!', duration: 5000})
    })
  }
}
