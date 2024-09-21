import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { combineLatest, Observable, Subscription } from "rxjs";
import { PokemonList } from "../../../core/services/pokemon.service";
import { fetchPokemonAction } from "../../../core/store/pokemon/pokemon.actions";
import { selectAllPokemon, selectCurrentPage, selectPokemonLoading } from "../../../core/store/pokemon/pokemon.selectors";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemonList$: Observable<PokemonList[]> = this.store.select(selectAllPokemon);
  loading$: Observable<boolean> = this.store.select(selectPokemonLoading);
  pageChange$: Subscription;
  itemsPerPage: number = 50;
  currentPage: number = 0;

  constructor(private store: Store) {
    this.pageChange$ = this.store.select(selectCurrentPage).subscribe(page => {
      this.currentPage = page;
    })
  }

  ngOnInit() {
    combineLatest([this.pokemonList$]).pipe(
        tap(([pokemonList]) => {
          // Check if the pokemonList is empty
          if (!pokemonList.length) {
            this.fetchData();
          }
        })
    ).subscribe();
  }

  fetchData() {
    this.store.dispatch(fetchPokemonAction({ payload: {itemsPerPage: this.itemsPerPage, page: this.currentPage}}))
  }

  ngOnDestroy() {
    this.pageChange$.unsubscribe();
  }
}
