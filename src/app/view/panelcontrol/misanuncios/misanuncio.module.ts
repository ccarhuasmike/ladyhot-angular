import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisAnuncioRoutingModule } from './misanuncio-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from "./index/index.component";
import { EditarAnuncioComponent } from './editanuncio/editanuncio.component';
import { GaleriaAnuncioComponent } from './galerianuncio/galerianuncio.component';
import { DarBajaComponent } from './darbaja/darbaja.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
//import { LoaderService } from "../../../shared/services/loader/loader.service";
@NgModule({
    imports: [
        CommonModule,
        MisAnuncioRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ProgressbarModule.forRoot(),

    ],
    declarations: [
        IndexComponent,
        EditarAnuncioComponent,
        GaleriaAnuncioComponent,
        DarBajaComponent
    ],
    exports: [
    ]
})
export class MisAnuncioModule { }
