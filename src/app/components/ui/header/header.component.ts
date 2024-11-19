import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as MoviesSelectors from '../../../state/selectros/movies.selectors';
import {Observable, take, tap} from 'rxjs';
import * as MovieActions from '../../../state/actions/movies.action';
import {IMovie} from '../../../interface/IMovie';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @Output() openMenuEvent = new EventEmitter()

  constructor(
    private store: Store,
    ) {}

  public moviesList$?: Observable<IMovie[]>;
  isMenuOpen:boolean = false;

  selectMovie(movieId: number) {
    this.store.dispatch(MovieActions.loadCurrentMovie({id: movieId}))
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.openMenuEvent.emit(!this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit() {
    this.store.pipe(
      select(MoviesSelectors.selectAllMovies),
      take(1),
      tap((data) => {
        if (!data || data.length === 0) {
          this.store.dispatch(MovieActions.loadMovies());
        }
      })
    ).subscribe();

    this.moviesList$ = this.store.pipe(select(MoviesSelectors.selectAllMovies));
  }

}
