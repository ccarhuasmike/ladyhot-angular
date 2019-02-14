import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoAnuncioComponent } from './mantenimiento-anuncio.component';
import { MantenimientoAnuncioRoutingModule } from './mantenimiento-anuncio-routing.module';
import { ListadoComponent } from './listado/listado.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        PaginationModule.forRoot(),
        MantenimientoAnuncioRoutingModule
    ],
    declarations: [
        MantenimientoAnuncioComponent,
        ListadoComponent
    ],
    exports: []
})
export class MantenimientoAnuncioModule { }