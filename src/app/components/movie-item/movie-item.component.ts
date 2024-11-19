import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {IMovie} from '../../interface/IMovie';
import * as MovieActions from '../../state/actions/movies.action';
import {map, Observable, take, tap} from 'rxjs';
import * as MoviesSelectors from '../../state/selectros/movies.selectors';
import {AsyncPipe, CommonModule, DatePipe, JsonPipe} from '@angular/common';
import {IPeople} from '../../interface/IPeople';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinner} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    JsonPipe,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatProgressSpinner,
  ],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss'
})
export class MovieItemComponent implements OnInit {
  public movieId!: number;
  public currentMovie$!: Observable<IMovie | null>;
  public currentPeople$!: Observable<IPeople[]>;
  public displayedColumns: string[] = ['id', 'name'];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
  }

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(MovieActions.loadCurrentMovie({id: this.movieId}))
    this.currentMovie$ = this.store.select(MoviesSelectors.selectCurrentMovie());

    this.store.pipe(
      select(MoviesSelectors.selectMoviesPeople()),
      take(1),
      tap((data) => {
        if (!data || data.length === 0) {
          this.store.dispatch(MovieActions.loadAllPeople());
        }
      })
    ).subscribe();

    this.currentPeople$ = this.store.pipe(select(MoviesSelectors.selectMoviesPeople()));

  //   this.currentPeople$ = this.store.pipe(
  //     select(MoviesSelectors.selectMoviesPeople()),
  //     map((people) => people || [])
  //   );
  }

}
