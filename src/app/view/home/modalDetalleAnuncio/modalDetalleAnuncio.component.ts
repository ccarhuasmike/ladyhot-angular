import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/shared/services/service.module';
import { ClientResponse } from 'src/app/Models/ClientResponseModels';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalLightboxComponent } from '../modal-lightbox/modal-lightbox.component';

declare var $: any;

@Component({
    selector: 'app-modal-detalle-anuncio',
    templateUrl: './modalDetalleAnuncio.component.html',
    styleUrls: ['./modalDetalleAnuncio.component.css']
})
export class ModalDetalleAnuncio implements OnInit {
    detalleDelAnuncio: any;
    isCollapsed = false;
    estiloColapsar = "";
    noMostrarTarifas: boolean = false;
    noMostrarHorario: boolean = false;
    modalRefLightbox: BsModalRef;

    constructor(
        public modalRef: BsModalRef,
        private anuncioService: AnuncioService,
        private modalService: BsModalService
    ) {
    }
    ngOnInit() {
        this.anuncioService.ObtenerDetalleAnucionXId(this["data"]["id"]).subscribe(
            (res: ClientResponse) => {

                debugger;
                if (res.Data["txt_presentacion"] != "") {
                    res.Data["txt_presentacion"] = res.Data["txt_presentacion"].replace(/(\n)+\n+|\t+/g, ";");
                }
                if (res.Data["tx_descripcion_extra_horario"] != "") {
                    res.Data["tx_descripcion_extra_horario"] = res.Data["tx_descripcion_extra_horario"].replace(/(\n)+\n+|\t+/g, ";").split("\n");
                }
                this.detalleDelAnuncio = res.Data;
                this.noMostrarTarifas = (this.detalleDelAnuncio.dbl_costo_x_tiempo_30min == 0 || this.detalleDelAnuncio.dbl_costo_x_tiempo_45min == 0
                    || this.detalleDelAnuncio.dbl_costo_x_tiempo_1hora == 0 || this.detalleDelAnuncio.dbl_costo_x_tiempo_1hora_media == 0
                    || this.detalleDelAnuncio.dbl_costo_x_tiempo_2hora == 0 || this.detalleDelAnuncio.dbl_costo_x_tiempo_3hora == 0
                    || this.detalleDelAnuncio.dbl_costo_x_tiempo_salidas == 0
                    || this.detalleDelAnuncio.dbl_costo_x_tiempo_toda_noche == 0 || this.detalleDelAnuncio.dbl_costo_x_viaje == 0
                    || this.detalleDelAnuncio.txt_forma_pago == null);
                this.noMostrarHorario = (this.detalleDelAnuncio.tx_descripcion_extra_horario == "" && this.detalleDelAnuncio.fl_atencion_24horas == 0);
                let dataSubirAutomatico = {
                    titulo: this.detalleDelAnuncio.txt_nombre_ficha,
                    foto: this.detalleDelAnuncio.txt_imagen_galeria ? this.detalleDelAnuncio.txt_imagen_prensetancion : 'assets/scort_sin_foto.jpg',
                    textPresentacion: this.detalleDelAnuncio.txt_presentacion.split(';')[0],
                    idAnuncio: this["data"]["id"]
                };
                sessionStorage.setItem("dataSubirAutomatico", JSON.stringify(dataSubirAutomatico));
            });
    }
    closeModal() {
        this.modalRef.hide();
    }

    openModalLightbox(imagesDetalleGaleria) {
        this.modalRefLightbox = this.modalService.show(ModalLightboxComponent, {
            class: 'modal-md modal-dialog-centered',
            initialState: {
                data: {
                    imagesDetalleGaleria: imagesDetalleGaleria
                }
            }
        });
    }
}