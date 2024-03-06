import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Director } from 'src/models/Director';
import { Movie } from 'src/models/Movie';
import { Review } from 'src/models/Review';
import { SearchData } from 'src/models/SearchData';
import { WishlistItem } from 'src/models/WishlistItem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly baseURL = "https://mmdbapi.azurewebsites.net/api/Movie"
  constructor(private http: HttpClient) {}

  GetMovies(): Observable<Movie[]>
  {
    return this.http.get<Movie[]>(`${this.baseURL}`);
  }
  GetMovieById(movidId: number): Observable<Movie>
  {
    return this.http.get<Movie>(`${this.baseURL}/${movidId}`);
  }
  SearchMovies(searchString: string, pageNumber: number): Observable<SearchData>
  {
    return this.http.get<SearchData>(`${this.baseURL}/${searchString}/${pageNumber}`)
  }
  GetReviewsByMovieId(movieId: number): Observable<Review[]>
  {
    return this.http.get<Review[]>(`${this.baseURL}/${movieId}/reviews`)
  }
  PostReviewsByMovieId(movieId: number, review: Review): Observable<Review>
  {
    return this.http.post<Review>(`${this.baseURL}/${movieId}/reviews`, review)
  }
  GetUserReviewsByUserId(userId: number): Observable<Review[]>
  {
    return this.http.get<Review[]>(`${this.baseURL}/reviews/${userId}`)
  }
  GetUserWishlistByUserId(userId: number): Observable<WishlistItem[]>
  {
    return this.http.get<WishlistItem[]>(`${this.baseURL}/wishlist/${userId}`)
  }
  PostUserWishlistItem(wishlistItem: WishlistItem): Observable<WishlistItem>
  {
    return this.http.post<WishlistItem>(`${this.baseURL}/wishlist`, wishlistItem)
  }
}
