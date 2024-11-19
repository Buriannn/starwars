import {createReducer, on} from '@ngrx/store';
import * as MoviesAction from '../actions/movies.action';
import {IMovie} from '../../interface/IMovie';
import {IPeopleList} from '../../interface/IPeopleList';
import {IPeopleFullData} from '../../interface/IPeopleFullData';

export interface MovieState {
  movies: IMovie[];
  currentMovie: IMovie | null;
  error: any;
  people: IPeopleList[];
  currentPeople: IPeopleFullData | null,
}

const initialState: MovieState = {
  movies: [],
  error: null,
  currentMovie: null,
  people: [],
  currentPeople: null,
}

export const moviesReducer = createReducer(
  initialState,
  on(MoviesAction.loadMoviesSuccess, (state, {movies}) => ({...state, movies})),
  on(MoviesAction.loadMoviesFailure, (state, {error}) => ({...state, error})),

  on(MoviesAction.loadCurrentMovieSuccess, (state, {currentMovie}) => ({...state, currentMovie})),
  on(MoviesAction.loadCurrentMovieFailure, (state, {error}) => ({...state, error})),

  on(MoviesAction.loadAllPeopleSuccess, (state, {people}) => ({...state, people}) ),
  on(MoviesAction.loadAllPeopleFailure, (state, {error}) => ({...state, error}) ),

  on(MoviesAction.loadCurrentPeopleSuccess, (state, {currentPeople}) => ({...state, currentPeople})),
  on(MoviesAction.loadCurrentPeopleFailure, (state, {error}) => ({...state, error})),

)
