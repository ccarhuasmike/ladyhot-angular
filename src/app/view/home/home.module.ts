import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { headerfilter } from './headerfilter/headerfilter.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        NgxMasonryModule,
        InfiniteScrollModule
    ],
    declarations: [IndexComponent,headerfilter]
  
})
export class HomeModule { }
