import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonPasarelaPagoComponent } from './boton-pasarela-pago/boton-pasarela-pago.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasarelaPagoService } from 'src/app/shared/services/pasarelapago/pasarelapago.service';
import { ModalModule } from 'ngx-bootstrap';
import { ModalPasarelaPagoComponent } from './modal-pasarela-pago/pasarela-pago.component';

@NgModule({
  declarations: [
    //PRUEBA - Dante Cc. 
    BotonPasarelaPagoComponent,
    //PRUEBA - Dante Cc. 
    ModalPasarelaPagoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    PasarelaPagoService
  ],
  entryComponents: [
    ModalPasarelaPagoComponent
  ]
})
export class PasarelaPagoModule { }
