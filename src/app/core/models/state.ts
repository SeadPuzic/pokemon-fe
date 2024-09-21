import { PokemonList } from "../services/pokemon.service";

export interface State {
    pokemonList: PokemonList[],
    itemsPerPage: number,
    page: number,
    loading: boolean
}
