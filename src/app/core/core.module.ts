import {NgModule, Optional, SkipSelf} from '@angular/core';
import { PokemonService } from "./services/pokemon.service";
import { HttpClientModule } from "@angular/common/http";
import { throwIfAlreadyLoaded } from "../module-import-guard";

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [PokemonService]
})

export class CoreModule { constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
  throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
