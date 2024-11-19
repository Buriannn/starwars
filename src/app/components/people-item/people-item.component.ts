import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as MoviesSelectors from '../../state/selectros/movies.selectors';
import * as MovieActions from '../../state/actions/movies.action';
import {Observable, take, tap} from 'rxjs';
import {IPeopleFullData} from '../../interface/IPeopleFullData';
import {AsyncPipe, DatePipe, JsonPipe} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-people-item',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    DatePipe,
    MatProgressSpinner
  ],
  templateUrl: './people-item.component.html',
  styleUrl: './people-item.component.scss'
})
export class PeopleItemComponent implements OnInit {

  public peopleId!: number;
  public currentPeople$?: Observable<IPeopleFullData | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {}


  ngOnInit() {

    this.peopleId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.pipe(
      select(MoviesSelectors.selectCurrentPeople(this.peopleId)),
      take(1),
      tap((currentPeople) => {
        if (!currentPeople) {
          this.store.dispatch(MovieActions.loadCurrentPeople({id: this.peopleId}))
        }
      })
    ).subscribe()

    this.currentPeople$ = this.store.pipe(select(MoviesSelectors.selectCurrentPeople(this.peopleId)));

  }
}
