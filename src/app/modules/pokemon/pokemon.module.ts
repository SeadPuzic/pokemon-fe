import { NgModule } from '@angular/core';
import { PokemonRouter } from "./pokemon.router";
import { HomeComponent } from "./home/home.component";
import { PokemonListComponent } from "./list/pokemon-list.component";
import { PokemonInformationComponent } from "./information/pokemon-information.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [HomeComponent, PokemonListComponent, PokemonInformationComponent],
  imports: [
    PokemonRouter,
    NgForOf,
    AsyncPipe,
    SharedModule
  ]
})
export class PokemonModule { }
