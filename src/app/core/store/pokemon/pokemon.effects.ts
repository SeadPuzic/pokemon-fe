import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import * as PokemonAction from "./pokemon.actions";
import {PokemonService} from "../../services/pokemon.service";

@Injectable()
export class PokemonEffects {
    constructor(private actions$: Actions, private pokemonService: PokemonService){}

    fetchPokemonRequest$ = createEffect(
        ()=>
            this.actions$.pipe(
                ofType(
                    PokemonAction.fetchPokemonAction),
                mergeMap((action) => {
                    return this.pokemonService.list(action.payload).pipe(
                        map((res:any)=>{
                            return PokemonAction.fetchPokemonResponseAction({payload: res})
                        }),
                        catchError((error) => of(PokemonAction.fetchPokemonErrorAction(error)))
                    )
                })
            )
    );
}
