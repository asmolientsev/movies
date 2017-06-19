import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MovieService } from '../services/movie.service';
import { Movie } from '../entities/movie';

@Component({
	selector: 'movie-favorites',
	templateUrl: './movie-favorites.component.html',
	styleUrls: [ './movie-favorites.component.css' ],
})
export class MovieFavoritesComponent implements OnInit {

	movies: Movie[];
	// selectedMovie: Movie;
	
	constructor(
		private movieService: MovieService,
    	private sanitizer: DomSanitizer) {
	}

	ngOnInit(): void {
		this.getMovies();
	}

	getMovies(): void {
		this.movies = this.movieService.getFavorites();
	}

	onSelect(movie: Movie): void {
		this.movieService.deleteFavorite(movie);
		this.getMovies();
	}

	getSafeUrl(url: string) {
		return this.sanitizer.bypassSecurityTrustUrl('https://image.tmdb.org/t/p/w500' + url);
	}
}