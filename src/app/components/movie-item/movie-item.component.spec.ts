import { TestBed } from '@angular/core/testing';
import { MovieItemComponent } from './movie-item.component';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as MovieActions from '../../state/actions/movies.action';
import * as MoviesSelectors from '../../state/selectros/movies.selectors';
import { IMovie } from '../../interface/IMovie';
import { IPeople } from '../../interface/IPeople';
import { JsonPipe, DatePipe } from '@angular/common';

describe('MovieItemComponent', () => {
  let component: MovieItemComponent;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const movieData: IMovie = {
    uid: 1,
    description: 'A great movie',
    properties: {
      characters: ['Luke', 'Han'],
      created: '1977-05-25',
      director: 'George Lucas',
      edited: '1997-01-01',
      episode_id: 'IV',
      opening_crawl: 'A long time ago...',
      planets: ['Tatooine', 'Alderaan'],
      producer: 'Gary Kurtz',
      release_date: '1977-05-25',
      species: ['Human', 'Droid'],
      starships: ['X-Wing'],
      title: 'Star Wars',
      url: 'http://example.com',
      vehicles: ['Speeder'],
    },
  };

  const peopleData: IPeople[] = [
    { name: 'Luke Skywalker', uid: 1, url: 'http://example.com/people/1' },
    { name: 'Han Solo', uid: 2, url: 'http://example.com/people/2' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieItemComponent, JsonPipe, DatePipe],
      providers: [
        provideMockStore({
          selectors: [
            { selector: MoviesSelectors.selectCurrentMovie(), value: movieData },
            { selector: MoviesSelectors.selectMoviesPeople(), value: peopleData },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine.createSpy().and.returnValue('1'),
              },
            },
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    const fixture = TestBed.createComponent(MovieItemComponent);
    component = fixture.componentInstance;
  });

  it('should get the movieId', () => {
    component.ngOnInit();
    expect(component.movieId).toBe(1);
  });

  it('should dispatch loadCurrentMovie', () => {
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(MovieActions.loadCurrentMovie({ id: 1 }));
  });

  it('should not dispatch loadAllPeople', () => {
    component.ngOnInit();
    expect(dispatchSpy).not.toHaveBeenCalledWith(MovieActions.loadAllPeople());
  });

  it('should display currentMovie properties', () => {
    const fixture = TestBed.createComponent(MovieItemComponent);
    fixture.detectChanges();

    const displayedText = fixture.debugElement.nativeElement.textContent;

    expect(displayedText).toContain(movieData.properties.producer);
    expect(displayedText).toContain(movieData.properties.director);
    expect(displayedText).toContain(new Date(movieData.properties.release_date).toLocaleDateString());
  });

});

