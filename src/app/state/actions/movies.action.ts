import {createAction, props} from '@ngrx/store';
import {IMovie} from '../../interface/IMovie';



export const loadMovies = createAction('[Movie] Load All Movies');
export const loadMoviesSuccess = createAction('[Movie] Load All Movies Success', props<{ movies: IMovie[] }>());
export const loadMoviesFailure = createAction('[Movie] Load All Movies Failure', props<{ error: any }>());

export const loadCurrentMovie = createAction('[Movie] Load Current Movie', props<{id: number}>());
export const loadCurrentMovieSuccess = createAction('[Movie] Load Current Movies Success', props<{ currentMovie: any }>());
export const loadCurrentMovieFailure = createAction('[Movie] Load Current Movies Failure', props<{ error: any }>());

export const loadAllPeople = createAction('[People] Load All People',);
export const loadAllPeopleSuccess = createAction('[People] Load All Movie People Success', props<{ people: any }>());
export const loadAllPeopleFailure = createAction('[People] Load All Movie People Failure', props<{ error: any }>());


export const loadCurrentPeople = createAction('[People] Load Current People', props<{ id: number }>());
export const loadCurrentPeopleSuccess = createAction('[People] Load Current People Success', props<{ currentPeople: any }>());
export const loadCurrentPeopleFailure = createAction('[People] Load Current People Failure', props<{ error: any }>());

