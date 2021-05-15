import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService : MessageService, 
    private httpClient : HttpClient
    ) { 
    //this.messageService = messageService;
  }

  /*   Sample 1 This is a asyncronous getHeroes without using httpclienty 

  This is a syncronous method
   getHeroes() : Hero[] {
     return HEROES;
   }
*/

/*   Sample 1 This is a asyncronous getHeroes without using httpclienty
  getHeroes() : Hero[] {
    const heroes = of ( HEROES ); //remmeber the use of "of"
    send a message using messageservice that we injected
    this.messageService.add('HeroService: fetched hereos');
    return heroes;
  }
*/
  //This is a asyncronous version of same method
  getHeroes() : Observable< Hero[] > {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    );
  }

  getHero(id: number) : Observable< Hero >   { 
    const hero = HEROES.find(h => h.id === id) as Hero; 
    this.messageService.add(`HeroService: fetched hero id=${id} returns ${ JSON.stringify( hero )}`);
    return of(hero);
  }

  log(msg : string){
    this.messageService.add(`HeroesService : ${msg}`);
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>( operation = 'operation', result?:T ) {
    return (error: any) : Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }  
  }
  
  private heroesUrl = 'api/heroes';

}
