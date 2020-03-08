import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { SubirAutomaticoComponent } from './subir-automatico/subir-automatico.component';
import { HeaderComponent } from './header/header.component';
import { TopAnuncioComponent } from './top-anuncio/top-anuncio.component';

@NgModule({
  declarations: [
    IndexComponent,
    SubirAutomaticoComponent,
    HeaderComponent,
    TopAnuncioComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
