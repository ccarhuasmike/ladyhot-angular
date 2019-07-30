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
    detalleDelAnuncio: any;
    isCollapsed = false;
    estiloColapsar = "";
    mostrarTarifas: boolean = false;
    mostrarHorario: boolean = false;
    constructor(
        public modalRef: BsModalRef,
        private anuncioService: AnuncioService,
        private parameter: ParameterService
    ) {
    }
    ngOnInit() {
        console.log(this["data"]["id"]);
        this.anuncioService.ObtenerDetalleAnucionXId(this["data"]["id"]).subscribe(
            (res: ClientResponse) => {
                res.Data["txt_presentacion"] = res.Data["txt_presentacion"].replace(/(\n)+\n+|\t+/g, ";");
                this.detalleDelAnuncio = res.Data;
            });
        /*this.mostrarTarifas = (this.detalleDelAnuncio.detalleDelAnuncio.dbl_costo_x_tiempo_30min && this.detalleDelAnuncio.detalleDelAnuncio.dbl_costo_x_tiempo_45min
            && this.detalleDelAnuncio.detalleDelAnuncio.dbl_costo_x_tiempo_1hora && this.detalleDelAnuncio.detalleDelAnuncio.dbl_costo_x_tiempo_1hora_media
            && this.detalleDelAnuncio.detalleDelAnuncio.dbl_costo_x_tiempo_2hora && this.detalleDelAnuncio.detalleDelAnuncio.dbl_costo_x_tiempo_3hora
            && this.detalleDelAnuncio.detalleDelAnuncio.dbl_costo_x_tiempo_salidas
            && this.detalleDelAnuncio.detalleDelAnuncio.dbl_costo_x_tiempo_toda_noche && this.detalleDelAnuncio.detalleDelAnuncio.dbl_costo_x_viaje
            && this.detalleDelAnuncio.detalleDelAnuncio.txt_forma_pago);
        this.mostrarHorario = true;*/
    }
    closeModal() {
        this.modalRef.hide();
    }
}