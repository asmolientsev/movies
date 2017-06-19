import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import { MovieModule } from './movies/movie.module';

import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    MovieModule,  
    AppRoutingModule,  
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
