import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MovieState} from '../reducer/movie.reducer';

export const selectMoviesState = createFeatureSelector<MovieState>('moviesState');

export const selectAllMovies = createSelector(
  selectMoviesState,
  (state: MovieState) => state.movies
);

export const selectMoviesError = createSelector(
  selectMoviesState,
  (state: MovieState) => state.error
);

export const selectCurrentMovie = () => createSelector(
  selectMoviesState,
  (state: MovieState) => state.currentMovie
)


export const selectMoviesPeople = () => createSelector(
  selectMoviesState,
  (state: MovieState) => state.people.filter(people => state.currentMovie?.properties.characters.includes(people.url))
)

export const selectCurrentPeople = (id: number) => createSelector(
  selectMoviesState,
  (state: MovieState) => Number(state.currentPeople?.uid) === id ? state.currentPeople : null
)
