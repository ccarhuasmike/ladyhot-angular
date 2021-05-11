import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClientResponse } from '../../../Models/ClientResponseModels';
import { NgxMasonryOptions } from 'ngx-masonry';
import { HomeService } from "../../../shared/services/anuncio/home.services";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SeoService } from 'src/app/shared/services/seo/seo.service';
import { ParameterService } from "../../../shared/services/anuncio/parameter.service";
import { FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { DetalleAnuncioComponent } from '../../componentes-reusable/detalle-anuncio/detalle-anuncio.component';

@Component({
  selector: 'app-home',
  templateUrl: "./index.component.html",
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  modalRef: BsModalRef;
  schema: {};
  public status: boolean = false;
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '2.0s',
    gutter: 5
  };
  list: any;
  public title = 'autobot';
  masonryImages: any;
  limit = 16;
  
  constructor(
    private homeService: HomeService,
    private modalService: BsModalService,
    private seoService: SeoService,
    private parameter: ParameterService,
  ) {
  }



  onScrollDown() {
    this.limit += 15;
    this.masonryImages = this.list.slice(0, this.limit);
  }
  onScrollUp() {
  }
  getLisAnuncios(filtrer: boolean = false, entidadFiltro: any = {}) {
    if (filtrer) {
      this.masonryImages = this.list.filter(function (e) {
        return e.txt_nombre_ficha.toLowerCase().indexOf(entidadFiltro.txt_nombre_ficha.toLowerCase()) > -1 ||
          e.txt_lugar_servicio_distrito.indexOf(entidadFiltro.txt_lugar_servicio_distrito) ||
          e.tx_servicios_ofrece.indexOf(entidadFiltro.tx_servicios_ofrece) ||
          e.tx_lugar_atencion.indexOf(entidadFiltro.tx_lugar_atencion)
      }).slice(0, this.limit);
      this.schema = this.seoService.generarJsonSchemaMovie(this.masonryImages.slice(0, 10));
    } else {
      this.homeService.getAnuncio().subscribe(
        (res: ClientResponse) => {

          this.list = JSON.parse(res.DataJson);
          this.masonryImages = this.list.slice(0, this.limit);
          this.schema = this.seoService.generarJsonSchemaMovie(this.masonryImages.slice(0, 10));
        },
        (error) => {
          console.log(error + "getLisAnuncios");
        }
      );
    }
  }
  ngOnInit() {
    this.getLisAnuncios();
  }

  RecepcionarFiltro(event): void {    
    this.getLisAnuncios(true, event.entidad);
  }
  openModalDetalleAnuncio(id: number) {
    this.modalRef = this.modalService.show(DetalleAnuncioComponent, {
      animated: true,
      //backdrop: 'static',
      class: 'modal-lg',
      initialState: {
        title: '',
        data: {
          id: id,
          mostrarBotonCloseModal: true
        }
      }
    });
  }
}