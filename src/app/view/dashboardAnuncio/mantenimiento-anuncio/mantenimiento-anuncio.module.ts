import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoAnuncioComponent } from './mantenimiento-anuncio.component';
import { MantenimientoAnuncioRoutingModule } from './mantenimiento-anuncio-routing.module';
import { ListadoComponent } from './listado/listado.component';

@NgModule({
    imports: [
        CommonModule,
        MantenimientoAnuncioRoutingModule
    ],
    declarations: [
        MantenimientoAnuncioComponent,
        ListadoComponent
    ],
    exports: []
})
export class MantenimientoAnuncioModule { }