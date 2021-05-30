import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxMasonryModule } from "ngx-masonry";
//import { HeaderComponent } from "./header/header.component";
import { RedireccionarAnuncioRoutingModule } from "./redireccionar-anuncio-routing.module";
import { VerAnuncioComponent } from './ver-anuncio/ver-anuncio.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ImageService } from "src/app/shared/services/Utilitarios/image.service";
import { DetalleAnuncioReusableModule } from "../modulos-reusable/detalle-anuncio-reusable.module";
import { HeaderReusableModule } from "../modulos-reusable/header-reusable.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RedireccionarAnuncioRoutingModule,
        NgxMasonryModule,
        InfiniteScrollModule,
        ReactiveFormsModule,
        DetalleAnuncioReusableModule,
        HeaderReusableModule
    ],
    declarations: [
        VerAnuncioComponent
    ],
    exports: [VerAnuncioComponent],
    bootstrap: [VerAnuncioComponent],
    providers: [
        ImageService,
        BsModalRef
    ]
})
export class RedireccionarAnuncioModule { }