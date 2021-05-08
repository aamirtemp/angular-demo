import { MessageService } from './../message.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector : "app-heroes",
  templateUrl :  './heroes.component.html',
  styleUrls : ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  ngOnInit(): void {
    this.getHeroes();
  }

  constructor(private _heroService : HeroService, private messageService : MessageService){
    this.heroService = _heroService;
    // this.getHeroes(); //not a good practice   
  }

  hero : Hero = {
    id : 1, name : "Windstorm"  
  }

  heroes? : Hero[] = [];
  heroService? : HeroService; 
  selectedHero? : Hero;

  // onSelect(hero: Hero) : void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`); // note the backtick syntax
  // }

  getHeroes() : void {
    //this.heroes = this.heroService?.getHeroes(); //this is the syncornous method of calling but this doesn't work in real world 
    
    //use the subscribe method
    this.heroService?.getHeroes()
              .subscribe( heroes => this.heroes = heroes );

  }
}