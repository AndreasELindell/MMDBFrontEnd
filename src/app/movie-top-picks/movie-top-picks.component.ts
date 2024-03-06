import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/models/Movie';
import { ApiService } from '../auth/service/api.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-movie-top-picks',
  templateUrl: './movie-top-picks.component.html',
  styleUrls: ['./movie-top-picks.component.css']
})
export class MovieTopPicksComponent implements OnInit {
  movieTopPicks: Movie[] = []

  constructor(private apiService: ApiService, 
    private toast:NgToastService) {}
  ngOnInit(): void {
    this.onGetAllMovies();
  }

  onGetAllMovies(): void
  {
    this.apiService.GetMovies().subscribe({
      next: (m) => this.movieTopPicks = m,
      error: (e) => this.toast.error({detail: 'Error', summary: e.message, duration: 5000})
    });
  }
}
