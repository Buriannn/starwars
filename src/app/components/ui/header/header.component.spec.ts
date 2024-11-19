import {TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {provideMockStore, MockStore} from '@ngrx/store/testing';
import {Store} from '@ngrx/store';
import * as MoviesSelectors from '../../../state/selectros/movies.selectors';
import * as MovieActions from '../../../state/actions/movies.action';
import {IMovie} from '../../../interface/IMovie';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const initialMoviesState: IMovie[] = [
    {uid: 1, description: 'Movie 1', properties: {characters: [], created: '', director: '', edited: '', episode_id: '', opening_crawl: '', planets: [], producer: '', release_date: '', species: [], starships: [], title: '', url: '', vehicles: []}},
    {uid: 2, description: 'Movie 2', properties: {characters: [], created: '', director: '', edited: '', episode_id: '', opening_crawl: '', planets: [], producer: '', release_date: '', species: [], starships: [], title: '', url: '', vehicles: []}}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideMockStore({
          selectors: [
            {selector: MoviesSelectors.selectAllMovies, value: initialMoviesState}
          ]
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    dispatchSpy = spyOn(store, 'dispatch');
    const fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadMovies action', () => {
    store.overrideSelector(MoviesSelectors.selectAllMovies, []);
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(MovieActions.loadMovies());
  });

  it('should not dispatch loadMovies action', () => {
    component.ngOnInit();
    expect(dispatchSpy).not.toHaveBeenCalledWith(MovieActions.loadMovies());
  });

});
