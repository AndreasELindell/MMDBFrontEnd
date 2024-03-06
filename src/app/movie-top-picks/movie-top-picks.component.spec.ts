import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTopPicksComponent } from './movie-top-picks.component';

describe('MovieTopPicksComponent', () => {
  let component: MovieTopPicksComponent;
  let fixture: ComponentFixture<MovieTopPicksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieTopPicksComponent]
    });
    fixture = TestBed.createComponent(MovieTopPicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
