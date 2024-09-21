import { ModuleWithProviders, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from "./shared/not-found/not-found.component";

export const AppRoutingModule: ModuleWithProviders<any> = RouterModule.forRoot([
  {
    path: '',
    loadChildren: () =>
        import('./modules/pokemon/pokemon.module').then((m) => m.PokemonModule)
  },

  // Eager loaded
  { path: '**', redirectTo: 'not-found' },
  { path: 'not-found', component: NotFoundComponent },
]);
