import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './entities/in-memory-data.service';

import { MovieListComponent } from './components/movie-list.component';
import { MovieSearchComponent } from './components/movie-search.component';
import { MovieFavoritesComponent } from './components/movie-favorites.component';
import { MovieService } from './services/movie.service';
import { MovieRoutingModule } from './movie.routing';

@NgModule({
	declarations: [
		MovieListComponent,
		MovieSearchComponent,
		MovieFavoritesComponent,
	],
	imports: [
		CommonModule,
		HttpModule,
		MovieRoutingModule,
		// InMemoryWebApiModule.forRoot(InMemoryDataService),
	],
	providers: [ 
		MovieService
	],
})
export class MovieModule {}