import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxMasonryModule } from "ngx-masonry";
//import { HeaderComponent } from "../home/header/header.component";
import { DetalleAnuncioComponent } from "./detalle-anuncio/detalle-anuncio.component";
import { FilterComponent } from "./filter/filer.component";
import { HeaderComponent } from "./header/header.component";
import { RedireccionarAnuncioRoutingModule } from "./redireccionar-anuncio-routing.module";
import { VerAnuncioComponent } from './ver-anuncio/ver-anuncio.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RedireccionarAnuncioRoutingModule,
        NgxMasonryModule,
        InfiniteScrollModule,
        ReactiveFormsModule
    ],
    declarations: [
        VerAnuncioComponent,
        HeaderComponent,
        FilterComponent,
        DetalleAnuncioComponent
    ],
    exports: [VerAnuncioComponent],
    bootstrap: [VerAnuncioComponent],
})
export class RedireccionarAnuncioModule { }