import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxMasonryModule } from "ngx-masonry";
//import { HeaderComponent } from "./header/header.component";
import { RedireccionarAnuncioRoutingModule } from "./redireccionar-anuncio-routing.module";
import { VerAnuncioComponent } from './ver-anuncio/ver-anuncio.component';
import { BsModalRef } from 'ngx-bootstrap';
import { ImageService } from "src/app/shared/services/Utilitarios/image.service";
import { ReusableModule } from "../reusable/reusable.module";
import { HeaderReusableModule } from "../reusable/header-reusable.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RedireccionarAnuncioRoutingModule,
        NgxMasonryModule,
        InfiniteScrollModule,
        ReactiveFormsModule,
        ReusableModule,
        HeaderReusableModule
    ],
    declarations: [
        VerAnuncioComponent,
        //HeaderComponent,
    ],
    exports: [VerAnuncioComponent],
    bootstrap: [VerAnuncioComponent],
    providers: [
        ImageService,
        BsModalRef
    ]
})
export class RedireccionarAnuncioModule { }