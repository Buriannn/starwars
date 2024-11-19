import {Routes} from '@angular/router';
import {MovieItemComponent} from './components/movie-item/movie-item.component';
import {PeopleItemComponent} from './components/people-item/people-item.component';
import {AppComponent} from './app.component';

export const routes: Routes = [
  {path: 'movie/:id', component: MovieItemComponent},
  {path: 'people/:id', component: PeopleItemComponent},
];
