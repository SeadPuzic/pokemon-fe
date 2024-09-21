import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from "../../models/state";

// Select the entire Pokemon feature state
export const selectPokemonState = createFeatureSelector<State>('pokemon');

// Select the list of Pokémon
export const selectAllPokemon = createSelector(
    selectPokemonState,
    (state: State) => state.pokemonList
);

export const selectCurrentPage = createSelector(
    selectPokemonState,
    (state: State) => state.page
);

export const selectItemsPerPage = createSelector(
    selectPokemonState,
    (state: State) => state.itemsPerPage
);

// Select the loading state
export const selectPokemonLoading = createSelector(
    selectPokemonState,
    (state: State) => state.loading
);
