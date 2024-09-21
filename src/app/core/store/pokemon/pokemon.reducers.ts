import { createReducer, on } from "@ngrx/store";
import * as PokemonAction from "./pokemon.actions"
import { State } from "../../models/state";

export const key="pokemon";
export const initialState: State = {
    pokemonList: [],
    itemsPerPage: 10,
    page: 0,
    loading: false
}

const _pokemonReducer = createReducer(
    initialState,
    on(PokemonAction.fetchPokemonAction, (state, {payload}) => ({ ...state, loading: true, page: payload.page, itemsPerPage: payload.itemsPerPage })),
    on(PokemonAction.fetchPokemonResponseAction,(state,{payload})=>{
        return {
            ...state,
            pokemonList: [...state.pokemonList, ...payload],
            loading: false,
        }
    }),
    on(PokemonAction.fetchPokemonErrorAction,(state,{error})=>{
        return {
            ...state,
            loading: false,
        }
    })
)

export function pokemonReducer(state:any, action:any){
    return _pokemonReducer(state, action)
}
