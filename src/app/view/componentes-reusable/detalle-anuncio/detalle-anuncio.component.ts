import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { AnuncioService } from 'src/app/shared/services/service.module';
import { ClientResponse } from 'src/app/Models/ClientResponseModels'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LightboxComponent } from '../lightbox/lightbox.component';

@Component({
    selector: 'detalle-anuncio',
    templateUrl: './detalle-anuncio.component.html',
    styleUrls: ['./detalle-anuncio.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DetalleAnuncioComponent implements OnInit{
    
    detalleDelAnuncio: any;
    noDatosGenerales: boolean = false;
    noMostrarTarifas: boolean = false;
    noMostrarFormaPago: boolean = false;
    noMostrarHorario: boolean = false;
    noMostrarApariencia: boolean = false;
    mostrarBotonCloseModal: boolean = false;
    modalRefLightbox: BsModalRef;
    slideIndex = 0;
    imagenes: [];

    @Input() idAnuncio: string;

    constructor(
        private anuncioService: AnuncioService,
        private domSanitizer: DomSanitizer,
        private router: Router,
        private modalService: BsModalService,
        private modalRef: BsModalRef
    ){}

    ngOnInit() {
        let id;
        if(this["data"] != null){
            id = this["data"]["id"];
            this.mostrarBotonCloseModal = this["data"]["mostrarBotonCloseModal"];
        }
        else if(this.idAnuncio != null)
            id = this.idAnuncio;
        this.anuncioService.ObtenerDetalleAnucionXId(id).subscribe(
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

                    this.imagenes = this.detalleDelAnuncio.txt_imagen_galeria.split(';').map((item, index) => {
                        return {
                            id:index+1,
                            url:this.domSanitizer.bypassSecurityTrustUrl(item),
                        }
                    });
                }else
                    this.router.navigate(['']);
            });
    }

    openLightbox() {
        this.modalRefLightbox = this.modalService.show(LightboxComponent, {
            animated: true,
            class: 'modal-lg modal-lightbox',
            initialState: {
                data: {
                    imagenes: this.imagenes,
                    slideIndex: this.slideIndex
                }
            }
          });
    }

    currentSlide(n) {
        this.slideIndex = n;
    }

    closeModal() {
        this.modalRef.hide();
    }
}