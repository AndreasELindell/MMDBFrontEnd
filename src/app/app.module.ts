import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { MovieTopPicksComponent } from './movie-top-picks/movie-top-picks.component';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    DashboardComponent,
    NavComponent,
    FooterComponent,
    SearchComponent,
    DetailsComponent,
    ReviewsComponent,
    MyReviewsComponent,
    MovieTopPicksComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor,
      multi: true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
