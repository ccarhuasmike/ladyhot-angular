import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filer.component';
import { ModalDetalleAnuncio } from './modalDetalleAnuncio/modalDetalleAnuncio.component';
import { ContentComponent } from './content/content.component';
import { headerfilter } from './headerfilter/headerfilter.component';
import { ModalModule } from 'ngx-bootstrap';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        NgxMasonryModule,
        InfiniteScrollModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot()
    ],
    declarations: [
        IndexComponent,
        HeaderComponent,
        FilterComponent,
        ContentComponent,
        headerfilter,
        ModalDetalleAnuncio],
    entryComponents: [
        ModalDetalleAnuncio
    ]
})
export class HomeModule { }