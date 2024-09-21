import {isDevMode, NgModule, Optional, SkipSelf} from '@angular/core';
import { PokemonService } from "./services/pokemon.service";
import { HttpClientModule } from "@angular/common/http";
import { throwIfAlreadyLoaded } from "../module-import-guard";
import { StoreModule } from "@ngrx/store";
import { appReducer, metaReducers } from "./store/app.reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { Effects } from "./store/app.effects";

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StoreModule.forRoot(appReducer, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    EffectsModule.forRoot(Effects)
  ],
  providers: [PokemonService]
})

export class CoreModule { constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
  throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
