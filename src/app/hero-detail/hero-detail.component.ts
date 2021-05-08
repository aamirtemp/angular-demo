import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {HeroService} from '../hero.service';
import { getSyntheticPropertyName } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private heroservice : HeroService,
    private location : Location
  ) 
  { 

  }

  ngOnInit(): void {
    this.getHero();
  }

  //@Input() hero? : Hero;
  hero? : Hero;


  getHero():void {
    const str_id =  this.route.snapshot.paramMap.get('id');
    const id = Number(str_id);
    this.heroservice.getHero(id).subscribe(hero => this.hero = hero);
  }
}
