import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalPasarelaPagoComponent } from '../modal-pasarela-pago/pasarela-pago.component';
import { PasarelaPagoService } from 'src/app/shared/services/pasarela-pago/pasarela-pago';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-boton-pasarela-pago',
    templateUrl: './boton-pasarela-pago.component.html',
    styleUrls: ['./boton-pasarela-pago.component.css']
})
export class BotonPasarelaPagoComponent {
    modalRef: BsModalRef;
    montoPagar: number;

    constructor(
        private modalService: BsModalService,
        private pasaPagoService: PasarelaPagoService) {
        this.obtenerLlavePublica();
    }

    modalPagar() {
        this.modalRef = this.modalService.show(ModalPasarelaPagoComponent, {
            class: 'modal-md',
            initialState: {
                title: 'Pasarale Pago',
                data: {
                    montoPagar: this.montoPagar,
                    descripcionCargo: 'Cobro para publicitarse en el LadyHot'
                }
            }
        });
    }

    obtenerLlavePublica() {
        if (sessionStorage.getItem("LLAVE_PUBLICA") == null) {
            this.pasaPagoService.obtenerLlavePublica().subscribe(
                (res) => {
                    sessionStorage.setItem("LLAVE_PUBLICA", res.DataJson);
                    environment.stripeKey = res.DataJson;
                }
            );
        } else {
            environment.stripeKey = sessionStorage.getItem("LLAVE_PUBLICA");
        }
    }
}