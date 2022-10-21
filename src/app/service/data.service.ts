import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  // get pokemons from API

  getPokemons(limit: number, offset: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit = ${limit} & offset=${offset}`);
  }

// offeset value ,hw many nr to skip, then put those values you'll need, equals to the page+0

  // get more pokemons data
  getMoreData(name: string){
     return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
