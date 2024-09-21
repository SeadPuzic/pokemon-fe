import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PokemonState } from "../../models/pokemonState";

// Select the entire Pokemon feature state
export const selectPokemonState = createFeatureSelector<PokemonState>('pokemon');

// Select the list of Pokémon
export const selectAllPokemon = createSelector(
    selectPokemonState,
    (state: PokemonState) => state.pokemonList
);

// Select current page
export const selectCurrentPage = createSelector(
    selectPokemonState,
    (state: PokemonState) => state.page
);

// Select the loading state
export const selectPokemonLoading = createSelector(
    selectPokemonState,
    (state: PokemonState) => state.loading
);
