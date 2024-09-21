import { PokemonList } from "../services/pokemon.service";

export interface PokemonState {
    pokemonList: PokemonList[],
    itemsPerPage: number,
    page: number,
    loading: boolean,
    error: string
}
