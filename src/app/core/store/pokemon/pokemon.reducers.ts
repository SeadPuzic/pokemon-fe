import { createReducer, on } from "@ngrx/store";
import { PokemonState } from "../../models/pokemonState";
import { fetchPokemonAction, fetchPokemonErrorAction, fetchPokemonResponseAction } from "./pokemon.actions";

export const key="pokemon";
export const initialState: PokemonState = {
    pokemonList: [],
    itemsPerPage: 10,
    page: 0,
    loading: false,
    error: ''
}

const _pokemonReducer = createReducer(
    initialState,
    on(fetchPokemonAction, (state, { payload}) => ({ ...state, loading: true, page: payload.page, itemsPerPage: payload.itemsPerPage })),
    on(fetchPokemonResponseAction,(state,{ payload})=>{
        return {
            ...state,
            pokemonList: [...state.pokemonList, ...payload],
            loading: false,
            error: ''
        }
    }),
    on(fetchPokemonErrorAction,(state, {error})=>{
        return {
            ...state,
            loading: false,
            error
        }
    })
)

export function pokemonReducer(state:any, action:any){
    return _pokemonReducer(state, action)
}
