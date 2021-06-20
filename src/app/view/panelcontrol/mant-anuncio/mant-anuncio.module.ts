import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { MantenimientoAnuncioRoutingModule } from './mant-anuncio-routing.module';
import { ListadoComponent } from './listado/listado.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalActualizaAnuncio } from './modal-actualizar-anuncio/modal-actualizar-anuncio.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        PaginationModule.forRoot(),
        MantenimientoAnuncioRoutingModule,
        ModalModule.forRoot()
    ],
    declarations: [
        IndexComponent,
        ListadoComponent,
        ModalActualizaAnuncio        
    ],
    exports: [],
    entryComponents: [
        ModalActualizaAnuncio        
    ]
})
export class MantAnuncioModule { }