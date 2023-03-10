import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = "api/heroes";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(val => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
    this.log('fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(val => this.log(`fetched hero with id=${id}`)),
      catchError(this.handleError<Hero>(`Error while retrieving hero with id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(tap(val => this.log(`Updated hero with id=${hero.id}`)),
        catchError(this.handleError<any>(`error while updating hero`))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(tap((newHero: Hero) => this.log(`Added hero w/ id=${newHero.id}, name=${newHero.name}`)),
        catchError(this.handleError<Hero>('addHero()')));
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.delete<Hero>(url, this.httpOptions)
      .pipe(tap(val => this.log(`deleted hero with id=${id}`)),
        catchError(this.handleError<Hero>("deleteHero")));
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.httpClient.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(tap(x => x.length ?
        this.log(`Found heroes matching term=${term}`) :
        this.log(`Didn't found any heroes matching term=${term}`)),
        catchError(this.handleError<Hero[]>("searchHeros", [])));
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`The ${operation} has failed with the following error: ${error.message}`)
      return of(result as T);
    }
  }
}
