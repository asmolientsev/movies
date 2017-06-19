import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { MovieListComponent }    from './components/movie-list.component';
import { MovieSearchComponent } from './components/movie-search.component';
import { MovieFavoritesComponent } from './components/movie-favorites.component';

const moviesRoutes: Routes = [
  // { path: 'dashboard',  component: DashboardComponent },
  	// { path: 'topic/:id',     component: PostListComponent },
  	// { path: 'post/:id', component: PostDetailComponent },
  	{ path: 'movies',     component: MovieListComponent },
    { path: 'search',     component: MovieSearchComponent },
    { path: 'favorite',     component: MovieFavoritesComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(moviesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MovieRoutingModule { }