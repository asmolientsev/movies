import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Movie } from '../entities/movie';


@Injectable()
export class MovieService {
    private domain = "https://api.themoviedb.org/3/";
    private discoverApi = "discover/movie?api_key=0f04bbdc102bbd08c7caca24bb575d45&language=en-US&include_adult=false&include_video=false";
	private searchUrl: string = "search/movie?api_key=0f04bbdc102bbd08c7caca24bb575d45&language=en-US&page=1&include_adult=false&query=";
	private headers = new Headers({'Content-Type':'application/json', });

    @Output() countFavoritesEmitter: EventEmitter<number> = new EventEmitter<number>();

	constructor(private http: Http){}

	getMovies(options=undefined): Promise<any> {
        options = options || {sort:"popularity.desc",page:1};
        const url = `${this.domain}${this.discoverApi}&sort_by=${options.sort}&page=${options.page}`;
		return this.http
			.get(url)
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}

	handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	search(term: string): Observable<Movie[]> {
        const url = `${this.domain}${this.searchUrl}${term}`;
    	return this.http
            .get(url)
            .map(response => response.json().results as Movie[]);
    }

    setFavorite(movie:Movie):void {
    	let items_str = window.localStorage.getItem('favorite');
    	if (!items_str)
    		var items = JSON.parse('[]');
    	else
    		var items = JSON.parse(items_str);
    	if (!items.find((element) => element.id==movie.id))
    		items.push(movie);
    	window.localStorage.setItem('favorite', JSON.stringify(items));
        this.countFavoritesEmitter.emit(items.length);
    }

    getFavorites():Movie[] {
    	let items_str = window.localStorage.getItem('favorite');
    	if (!items_str)
    		var items = JSON.parse('[]');
    	else
    		var items = JSON.parse(items_str);
    	return items;
    }

    deleteFavorite(movie:Movie):void {
        let items_str = window.localStorage.getItem('favorite');
        if (!items_str)
            var items = JSON.parse('[]');
        else
            var items = JSON.parse(items_str);
        let index = items.findIndex((element) => element.id==movie.id);
        console.log(index);
        if (index>=0)
            items.splice(index,1);
        window.localStorage.setItem('favorite', JSON.stringify(items));
        this.countFavoritesEmitter.emit(items.length);
    }

    getCountFavorites() {
        let items_str = window.localStorage.getItem('favorite');
        if (!items_str)
            var items = JSON.parse('[]');
        else
            var items = JSON.parse(items_str);
        return items.length;
    }

    getCountFavoritesEmitter() {
        return this.countFavoritesEmitter;
    }

}