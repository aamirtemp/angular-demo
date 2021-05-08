import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private heroService : HeroService) { }

  heroes : Hero[] = [];

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() : void {

    this.heroService.getHeroes()
      .subscribe(heroesdata => this.heroes = heroesdata.slice(1,5) );
  }

}
