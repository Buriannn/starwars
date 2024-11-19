export interface IMovie {
  description: string;
  properties: {
    characters: string[],
    created: string,
    director: string,
    edited: string,
    episode_id: string,
    opening_crawl: string,
    planets: string[],
    producer: string,
    release_date: string,
    species: string[],
    starships: string[],
    title: string,
    url: string,
    vehicles: string[],
  }
  uid: number,

}
