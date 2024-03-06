import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../auth/service/api.service';
import { Movie } from 'src/models/Movie';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute } from '@angular/router';
import { PageData, SearchData } from 'src/models/SearchData';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchQuery: string | any;
  currentPage: number = 1;
  searchData: SearchData | any; 
  constructor(private apiService: ApiService,
    private toast: NgToastService,
    private route: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.searchQuery = this.route.snapshot.paramMap.get('searchQuery')
    this.OnGetSearchMovie()
  }
  OnGetSearchMovie(){
    this.apiService.SearchMovies(this.searchQuery, this.currentPage).subscribe({
      next: (r) => {this.searchData = r},
      error: (e) => this.toast.error({detail: 'Error', summary: 'No search Results', duration: 5000})
    });
  }
  ChangePage(page:number)
  {
    this.currentPage = this.currentPage + page;
    this.OnGetSearchMovie();
  }
}
