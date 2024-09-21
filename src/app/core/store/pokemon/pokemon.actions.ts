import { createAction, props } from "@ngrx/store";
import {Order} from "../../services/rest.service";
import {PokemonList} from "../../services/pokemon.service";

export const fetchPokemonAction = createAction(
    '[Pokemon] fetch request action',
    props<{payload: Order}>()
);

export const fetchPokemonResponseAction = createAction(
    '[Pokemon] fetch response action',
    props<{payload: PokemonList[]}>()
);

export const fetchPokemonErrorAction = createAction(
    '[Pokemon] fetch response error action',
    props<{error: string}>()
);

export const resetState = createAction('CLEAR_STATE');
