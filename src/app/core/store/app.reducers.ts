import { ActionReducer, MetaReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
import * as pokemonReducer  from "./pokemon/pokemon.reducers";

export const appReducer = {
    pokemon: pokemonReducer.pokemonReducer
}
export function localStorageSyncReducer(
    reducer: ActionReducer<any>
): ActionReducer<any> {
    const isBrowser = typeof window !== 'undefined' && !!window.sessionStorage;

    if (isBrowser) {
        // Use sessionStorage if available
        return localStorageSync({
            keys: [pokemonReducer.key],
            rehydrate: true,
            storage: window.sessionStorage,
        })(reducer);
    }

    // Fall back to no storage (or other handling for SSR)
    return reducer;
}

export function clearState(
    reducer: ActionReducer<any>
): ActionReducer<any> {
    return (state, action) => {
        if(action !== null && action.type === "CLEAR_STATE"){
            return reducer(undefined, {type: "CLEAR_STATE"});
        }
        return reducer(state, action);
    }
}

export const metaReducers: Array<MetaReducer<any, any>> = [
    localStorageSyncReducer,
    clearState
]
