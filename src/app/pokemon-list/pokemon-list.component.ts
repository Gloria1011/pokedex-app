import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = []
  // We get the current page(pagiantion),which is valid.
  page = 1
  totalPokemons: number | any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getPokemons();
}

// get Pokemons method

getPokemons(){
  this.dataService.getPokemons(10, this.page + 0)
  .subscribe((response: any) => {
    this.totalPokemons = response.count;
    
// we loop through our pokemons
    response.results.forEach((result: { name: string; }) => {
      this.dataService.getMoreData(result.name)
        .subscribe((uniqResponse: any) => {
          this.pokemons.push(uniqResponse);
          console.log(this.pokemons)
        })
    });
  })
}

}

