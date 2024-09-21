import { NgModule } from '@angular/core';
import { NotFoundComponent } from "./not-found/not-found.component";
import { RouterLink } from "@angular/router";
import { InfiniteScrollComponent } from "./infinite-scroll/infinite-scroll.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [InfiniteScrollComponent, NotFoundComponent],
  imports: [ CommonModule, RouterLink, InfiniteScrollModule, ],
  exports: [InfiniteScrollComponent, NotFoundComponent]
})
export class SharedModule { }
