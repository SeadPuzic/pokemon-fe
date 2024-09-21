import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order, RestService } from './rest.service';

export type PokemonList = {
  name: string,
  image: string
}

export type Pokemon = {
  name: string
}

@Injectable()
export class PokemonService extends RestService {
  basePath = 'api';
  override apiPath = '';
  override version = '';


  constructor(http: HttpClient) {
    super(http);
  }

  list(order: Order | {} = {page: 0, itemsPerPage: 20}): Observable<PokemonList[]> {
    return this.http.post(order, 'pokemon-list');
  }

  getInformation(pokemonName: string): Observable<Pokemon> {
    return this.http.get(`pokemon-information/${pokemonName}`)
  }
}
