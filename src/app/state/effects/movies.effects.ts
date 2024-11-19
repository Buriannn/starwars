import {DataService} from '../../services/data.service';
import {ofType, createEffect, Actions} from '@ngrx/effects';
import * as MoviesActions from '../actions/movies.action';
import {Injectable} from '@angular/core';
import {catchError, map, mergeMap, of, withLatestFrom} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {MovieState} from '../reducer/movie.reducer';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{ moviesState: MovieState }>
  ) {
  }

  // loadMovies$ = createEffect(() => this.actions$.pipe(
  //     ofType(MoviesActions.loadMovies),
  //     withLatestFrom(this.store.pipe(select(state => state.moviesState.movies))),
  //     mergeMap(([action, cachedMovies]) => {
  //       if (cachedMovies && cachedMovies.length > 0) {
  //         return of(MoviesActions.loadMoviesSuccess({movies: cachedMovies}));
  //       } else {
  //         return this.dataService.getMovies().pipe(
  //           map(movies => MoviesActions.loadMoviesSuccess({movies})),
  //           catchError(error => of(MoviesActions.loadMoviesFailure({error})))
  //         );
  //       }
  //     })
  //   )
  // );

  loadMovies$ = createEffect(() => this.actions$.pipe(
      ofType(MoviesActions.loadMovies),
      mergeMap(() => {
        const cachedMovies = localStorage.getItem('movies');
        if (cachedMovies) {
          return of(MoviesActions.loadMoviesSuccess({movies: JSON.parse(cachedMovies)}));
        } else {
          return this.dataService.getMovies().pipe(
            map(movies => {
              localStorage.setItem('movies', JSON.stringify(movies));
              return MoviesActions.loadMoviesSuccess({movies});
            }),
            catchError(error => of(MoviesActions.loadMoviesFailure({error})))
          );
        }
      })
    )
  );

  loadCurrentMovies$ = createEffect(() => this.actions$.pipe(
    ofType(MoviesActions.loadCurrentMovie),
    withLatestFrom(this.store.select(state => state.moviesState.movies)),
    mergeMap(([action, cachedMovies]) => {
      if (cachedMovies.length > 0) {
        const movie = cachedMovies.find(item => +item.uid === +action.id);
        return of(MoviesActions.loadCurrentMovieSuccess({currentMovie: movie}))
      } else {
        return this.dataService.getCurrentMovie(action.id).pipe(
          map(currentMovie => MoviesActions.loadCurrentMovieSuccess({currentMovie})),
          catchError(error => of(MoviesActions.loadCurrentMovieFailure({error})))
        )
      }
    })
  ))

  loadAllPeople$ = createEffect(() => this.actions$.pipe(
    ofType(MoviesActions.loadAllPeople),
    withLatestFrom(this.store.select(state => state.moviesState.people)),
    mergeMap(([action, cachedPeople]) => {
      if (cachedPeople.length > 0) {
        return of(MoviesActions.loadAllPeopleSuccess({people: cachedPeople}));
      } else {
        return this.dataService.getPersons().pipe(
          map(people => MoviesActions.loadAllPeopleSuccess({people})),
          catchError(error => of(MoviesActions.loadAllPeopleFailure({error})))
        )
      }
    })
  ))

  loadCurrentPeople$ = createEffect(() => this.actions$.pipe(
    ofType(MoviesActions.loadCurrentPeople),
    withLatestFrom(this.store.select(state => state.moviesState.currentPeople)),
    mergeMap(([action, cachedPeople]) => {
      if (cachedPeople?.uid === action.id) {
        return of(MoviesActions.loadCurrentPeopleSuccess({currentPeople: cachedPeople}));
      } else {
        return this.dataService.getCurrentPeople(action.id).pipe(
          map(people => MoviesActions.loadCurrentPeopleSuccess({currentPeople: people})),
          catchError(error => of(MoviesActions.loadCurrentPeopleFailure({error})))
        )
      }
    })
  ))

}
