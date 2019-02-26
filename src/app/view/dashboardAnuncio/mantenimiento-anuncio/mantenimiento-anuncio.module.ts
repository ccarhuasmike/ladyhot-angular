import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoAnuncioComponent } from './mantenimiento-anuncio.component';
import { MantenimientoAnuncioRoutingModule } from './mantenimiento-anuncio-routing.module';
import { ListadoComponent } from './listado/listado.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalActualizaAnuncio } from './modal-actualizar-anuncio/modal-actualizar-anuncio.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        PaginationModule.forRoot(),
        MantenimientoAnuncioRoutingModule,
        ModalModule.forRoot()
    ],
    declarations: [
        MantenimientoAnuncioComponent,
        ListadoComponent,
        ModalActualizaAnuncio
    ],
    exports: [],
    entryComponents: [
        ModalActualizaAnuncio
    ]
})
export class MantenimientoAnuncioModule { }