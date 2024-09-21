import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PokemonListComponent } from "./list/pokemon-list.component";
import { PokemonInformationComponent } from "./information/pokemon-information.component";

export const PokemonRouter: ModuleWithProviders<any> = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pokemon-list' },
      {
        path: 'pokemon-list',
        component: PokemonListComponent,
      },
      {
        path: 'pokemon/:id',
        component: PokemonInformationComponent,
      }
    ],
  }
]);
