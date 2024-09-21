import {isDevMode, NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { Effects } from "./core/store/app.effects";
import { CoreModule } from "./core/core.module";
import { appReducer, metaReducers } from "./core/store/app.reducers";
import { CommonModule } from "@angular/common";
import { PokemonModule } from "./modules/pokemon/pokemon.module";
import { SharedModule } from "./shared/shared.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PokemonModule,
    StoreModule.forRoot(appReducer, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    EffectsModule.forRoot(Effects)
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
