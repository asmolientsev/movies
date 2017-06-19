import { Component, OnInit } from '@angular/core';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
 
// Observable class extensions
import 'rxjs/add/observable/of';
 
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
 
import { MovieService } from '../services/movie.service';
import { Movie } from '../entities/movie';
 
@Component({
  selector: 'movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: [ './movie-search.component.css' ],
})
export class MovieSearchComponent implements OnInit {
  movies: Observable<Movie[]>;
  private searchTerms = new Subject<string>();
 
  constructor(
    private movieService: MovieService) {}
 
  
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    this.movies = this.searchTerms
      .debounceTime(300)        
      .distinctUntilChanged()   
      .switchMap(term => term ? this.movieService.search(term) : Observable.of<Movie[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Movie[]>([]);
      });
  }

  onAddFavorite(movie: Movie){
    this.movieService.setFavorite(movie);
  }
}