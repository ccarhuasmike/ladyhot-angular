import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { ModalDetalleAnuncio } from './modalDetalleAnuncio/modalDetalleAnuncio.component';
import { ModalModule } from 'ngx-bootstrap';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxJsonLdModule } from 'ngx-json-ld';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        NgxMasonryModule,
        InfiniteScrollModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        // Register module
        NgxJsonLdModule
    ],
    declarations: [
        IndexComponent,        
        ModalDetalleAnuncio,
        ],
    exports: [IndexComponent],
    bootstrap: [IndexComponent],
    entryComponents: [
        ModalDetalleAnuncio
    ]
})
export class HomeModule { }