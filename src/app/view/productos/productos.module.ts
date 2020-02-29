import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { SubirAutomaticoComponent } from './subir-automatico/subir-automatico.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    IndexComponent,
    SubirAutomaticoComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
