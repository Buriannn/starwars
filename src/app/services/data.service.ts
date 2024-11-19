import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {IMovie} from '../interface/IMovie';
import {IPeopleFullData} from '../interface/IPeopleFullData';

interface IResponse {
  message: string;
  result: IMovie[];
}

interface IPeopleResponse {
  message: string;
  next: string;
  previous: string;
  results: string[];
  total_pages: number;
  total_records: number;
}

interface ICurrentPeopleResponse {
  message: string;
  result: IPeopleFullData
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    private http: HttpClient,
  ) {
  }


  public getMovies(): Observable<IMovie[]> {
    return this.getMoviesData().pipe(
      map((response: IResponse) => response.result),
      catchError(error => {
        console.error('Error of get all movies', error);
        return of(error);
      })
    )
  }

  private getMoviesData(): Observable<IResponse> {
    return this.http.get<IResponse>("https://www.swapi.tech/api/films/");
  }


  public getCurrentMovie(id: number): Observable<IMovie[]> {
    return this.getCurrentMovieData(id).pipe(
      map((response: IResponse) => response.result),
      catchError(error => {
        console.error('Error of get movie', error);
        return of(error);
      })
    )
  }

  private getCurrentMovieData(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`https://www.swapi.tech/api/films/${id}`);
  }


  public getPersons() {
    return this.getAllPersonsData().pipe(
      map((response: IPeopleResponse) => response.results),
      catchError(error => {
        console.error('Error of get persons', error);
        return of([]);
      })
    )
  }

  private getAllPersonsData() {
    return this.http.get<IPeopleResponse>("https://www.swapi.tech/api/people?page=1&limit=*");
  }

  public getCurrentPeople(id: number) {
    return this.getCurrentPeopleData(id).pipe(
      map((response: ICurrentPeopleResponse) => response.result),
      catchError(error => {
        console.error('Error of get current people', error);
        return of([]);
      })
    )
  }

  private getCurrentPeopleData(id: number) {
    return this.http.get<ICurrentPeopleResponse>(`https://www.swapi.tech/api/people/${id}`);
  }

}
