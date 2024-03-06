import { Component } from '@angular/core';
import { WishlistItem } from 'src/models/WishlistItem';
import { ApiService } from '../auth/service/api.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishlist: WishlistItem[] = [];

  constructor(private apiService: ApiService, 
    private toast:NgToastService,
    private authservice: AuthService) {
    
  }
  ngOnInit(): void {
    this.onGetUserReviews();
  }
  onGetUserReviews():void 
  {
    this.apiService.GetUserWishlistByUserId(this.authservice.decodedToken().unique_name[1]).subscribe({
      next: (r) => this.wishlist = r,
      error: (e) => this.toast.error({detail: 'Error', summary: e.message, duration: 5000})
    })
  }
}
