import { Component, Input, OnInit } from "@angular/core";
import { AnuncioService } from 'src/app/shared/services/service.module';
import { ClientResponse } from 'src/app/Models/ClientResponseModels'
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { ModalLightboxComponent } from "../../home/modal-lightbox/modal-lightbox.component";
import { Router } from "@angular/router";

@Component({
    selector: 'detalle-anuncio',
    templateUrl: './detalle-anuncio.component.html',
    styleUrls: ['./detalle-anuncio.component.css'],
})
export class DetalleAnuncioComponent implements OnInit{
    
    detalleDelAnuncio: any;
    noDatosGenerales: boolean = false;
    noMostrarTarifas: boolean = false;
    noMostrarFormaPago: boolean = false;
    noMostrarHorario: boolean = false;
    noMostrarApariencia: boolean = false;
    modalRefLightbox: BsModalRef;

    @Input() idAnuncio: string;

    constructor(
        private anuncioService: AnuncioService,
        private modalService: BsModalService,
        private router: Router
    ){}

    ngOnInit() {
        this.anuncioService.ObtenerDetalleAnucionXId(this.idAnuncio).subscribe(
            (res: ClientResponse) => {
                if(res.Data != null){
                    if (res.Data["txt_presentacion"] != "") {
                        res.Data["txt_presentacion"] = res.Data["txt_presentacion"].replace(/(\n)+\n+|\t+/g, ";");
                    }
                    if (res.Data["tx_descripcion_extra_horario"] != "") {
                        res.Data["tx_descripcion_extra_horario"] = res.Data["tx_descripcion_extra_horario"].replace(/(\n)+\n+|\t+/g, ";").split("\n");
                    }
                    this.detalleDelAnuncio = res.Data;
                    this.noDatosGenerales = (this.detalleDelAnuncio.txt_descripcion_edad != "" || this.detalleDelAnuncio.tx_pais_origen != "" || this.detalleDelAnuncio.tx_estudio != "");
                    this.noMostrarTarifas = (this.detalleDelAnuncio.dbl_costo_x_tiempo_30min != 0 || this.detalleDelAnuncio.dbl_costo_x_tiempo_45min != 0
                        || this.detalleDelAnuncio.dbl_costo_x_tiempo_1hora != 0 || this.detalleDelAnuncio.dbl_costo_x_tiempo_1hora_media != 0
                        || this.detalleDelAnuncio.dbl_costo_x_tiempo_2hora != 0 || this.detalleDelAnuncio.dbl_costo_x_tiempo_3hora != 0
                        || this.detalleDelAnuncio.dbl_costo_x_tiempo_salidas != 0
                        || this.detalleDelAnuncio.dbl_costo_x_tiempo_toda_noche != 0 || this.detalleDelAnuncio.dbl_costo_x_viaje != 0);
                    this.noMostrarFormaPago = (this.detalleDelAnuncio.txt_forma_pago != null);
                    this.noMostrarHorario = (this.detalleDelAnuncio.tx_descripcion_extra_horario != "" || this.detalleDelAnuncio.fl_atencion_24horas != 0);
                    this.noMostrarApariencia = (this.detalleDelAnuncio.tx_color_cabello != "" || this.detalleDelAnuncio.tx_color_ojos != "" || this.detalleDelAnuncio.tx_estatura != "" 
                        || this.detalleDelAnuncio.txt_medidas_busto_cintura_cadera != "");
                }else
                    this.router.navigate(['']);
            });
    }

    openModalLightbox(imagesDetalleGaleria) {
        this.modalRefLightbox = this.modalService.show(ModalLightboxComponent, {
            class: 'modal-md modal-dialog-centered second',
            initialState: {
                data: {
                    imagesDetalleGaleria: imagesDetalleGaleria
                }
            }
        });
        document.getElementsByClassName('second')[0].parentElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
}