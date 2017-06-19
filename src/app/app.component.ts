import { Component, OnInit } from '@angular/core';

import { MovieService } from './movies/services/movie.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movies';
  countFavorites:number;
  countFavoritesSubscription: any;
  
  constructor(private movieService: MovieService){}

  ngOnInit() {
  	this.countFavorites = this.movieService.getCountFavorites();
  	this.countFavoritesSubscription = this.movieService.getCountFavoritesEmitter();
	this.countFavoritesSubscription.subscribe((count: number) => this.countFavorites = count);
  }
}
