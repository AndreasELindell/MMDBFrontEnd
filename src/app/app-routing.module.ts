import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { MovieTopPicksComponent } from './movie-top-picks/movie-top-picks.component';
import { WishlistComponent } from './wishlist/wishlist.component';



const routes: Routes = [
  {path: 'login', component: AuthComponent, title:'Login'},
  {path: 'register', component: RegisterComponent, title:'Register'},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, title:'Dashboard', canActivate:[authGuard]},
  {path: 'search/:searchQuery', component: SearchComponent, title:'Search', canActivate:[authGuard]},
  {path: 'details/:movieId', component: DetailsComponent, title:'Details', canActivate:[authGuard]},
  {path: 'myreviews', component: MyReviewsComponent, title:'My Reviews', canActivate:[authGuard]},
  {path: 'movieTopPicks', component: MovieTopPicksComponent, title: 'Top Picks', canActivate:[authGuard]},
  {path: 'watchlist', component: WishlistComponent,title: 'My Watchlist', canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
