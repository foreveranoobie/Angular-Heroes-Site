import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css']
})
export class Component2Component {
  ngOnInit(): void {
    this.initHeroes();
  }

  heroes?: Hero[];
  selectedHero?: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService){}

  initHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if(!name){
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes?.push(hero);
    })
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes?.filter(existingHero => existingHero !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
