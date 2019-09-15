import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalPasarelaPagoComponent } from '../modal-pasarela-pago/pasarela-pago.component';

@Component({
    selector: 'app-boton-pasarela-pago',
    templateUrl: './boton-pasarela-pago.component.html',
    styleUrls: ['./boton-pasarela-pago.component.css']
})
export class BotonPasarelaPagoComponent {
    modalRef: BsModalRef;

    constructor(
        private modalService: BsModalService) { }

    modalPagar() {
        this.modalRef = this.modalService.show(ModalPasarelaPagoComponent, {
            class: 'modal-sm',
            initialState: {
                title: 'Actualizar Anuncio Demo',
                data: {
                    //id: id
                }
            }
        });
    }
}