import { Component, OnInit } from '@angular/core';
import { ParameterService, AnuncioService } from 'src/app/shared/services/service.module';
import { ClientResponse } from 'src/app/Models/ClientResponseModels';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-modal-detalle-anuncio',
    templateUrl: './modalDetalleAnuncio.component.html',
    styleUrls: ['./modalDetalleAnuncio.component.css']
})
export class ModalDetalleAnuncio implements OnInit {  
    constructor(
        public modalRef: BsModalRef,
        private anuncioService: AnuncioService,
        private parameter: ParameterService
    ) {
    }
    ngOnInit() {          
        console.log(this["data"]["id"]);
    }
    closeModal() {
        this.modalRef.hide();
    }  
}