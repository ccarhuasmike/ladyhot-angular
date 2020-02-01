import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { SubirAutomaticoComponent } from './subir-automatico/subir-automatico.component';

@NgModule({
  declarations: [
    IndexComponent,
    SubirAutomaticoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
