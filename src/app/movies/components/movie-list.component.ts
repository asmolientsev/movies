import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MovieService } from '../services/movie.service';
import { Movie } from '../entities/movie';

@Component({
	selector: 'movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: [ './movie-list.component.css' ],
})
export class MovieListComponent implements OnInit {

	movies: Movie[];
	page:number = 1;
	sort:string = 'popularity.desc';
	pageItems: any[];
	
	constructor(
		private movieService: MovieService,
    	private sanitizer: DomSanitizer) {
	}

	ngOnInit() {
		this.getMovies();
	}

	getMovies() {
		this.movieService.getMovies({sort:this.sort, page:this.page})
			.then(data => {
				this.page = data.page;
				this.generatePages(data.total_pages<=1000 ? data.total_pages : 1000);
				return data.results as Movie[];
			})
			.then(movies => this.movies = movies);
	}

	onSelect(movie: Movie) {
		this.movieService.setFavorite(movie);
	}

	getSafeUrl(url: string) {
		return this.sanitizer.bypassSecurityTrustStyle('url('+'https://image.tmdb.org/t/p/w500' + url + ')');
	}

	onChangeSort(event) {
		this.sort = event.target.value;
		this.getMovies();
	}

	generatePages(total_pages:number) {
		this.pageItems = [];
		if (this.page>1){
			this.pageItems.push({index:1, name:'<<'});//new Array(data.total_pages).map();
			this.pageItems.push({index:this.page-1, name:'<'});
		}
		this.pageItems.push({index:this.page, name:this.page});
		if ((total_pages-this.page)>0){
			this.pageItems.push({index:this.page+1, name:'>'});
			this.pageItems.push({index:total_pages, name:'>>'});			
		}
	}

	onSelectPage(page:number) {
		this.page = page;
		this.getMovies();
	}
}