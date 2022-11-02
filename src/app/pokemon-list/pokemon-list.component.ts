import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = []
  // We get the current page of pagiantion,which is valid.
  page = 1
  totalPokemons: number | any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getPokemons();

  }

  // get Pokemons method

  getPokemons() {

    // FIRST CALL
    this.dataService.getPokemons(10, this.page + 0)
      // here we get the list with minimal data per pokemnon name
      .subscribe((response: any) => {
        // WHAT API GIVES US,THE OBJECT
        this.totalPokemons = response.count;
        // we loop through our pokemons
        response.results.forEach((result: { name: string; }) => {

          // SECOND CALL FOR MORE INFO
          this.dataService.getMoreDataPerPokemon(result.name)
            // here is a second http call to our rest pokemon api
            // so we get more info per pokemon by name
            .subscribe((uniqResponse: any) => {
              console.log(uniqResponse)
              this.pokemons.push(uniqResponse);
              console.log(this.pokemons)
            })



        });
      })
  }

}

