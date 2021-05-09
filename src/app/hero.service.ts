import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
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

  //This is a syncronous method
  // getHeroes() : Hero[] {
  //   return HEROES;
  // }

  //This is a asyncronous version of same method
  getHeroes() : Observable< Hero[] > {
    //const heroes = of ( HEROES ); //remmeber the use of "of"
   
    return this.httpClient.get<Hero[]>(this.heroesUrl);
    //send a message using messageservice that we injected
    //this.messageService.add('HeroService: fetched hereos');

    //return heroes;
  }

  getHero(id: number) : Observable< Hero >   { 
    const hero = HEROES.find(h => h.id === id) as Hero; 

    this.messageService.add(`HeroService: 
    fetched hero id=${id} returns ${ JSON.stringify( hero )}`);
  
    return of(hero);
  }

  log(msg : string){
    this.messageService.add(`HeroesService : ${msg}`);
  }

  private heroesUrl = 'api/heroes';

}
