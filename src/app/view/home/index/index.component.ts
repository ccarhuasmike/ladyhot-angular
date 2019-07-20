import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClientResponse } from '../../../Models/ClientResponseModels';
import { NgxMasonryOptions } from 'ngx-masonry';
import { HomeService } from "../../../shared/services/anuncio/home.services";
import { MessageService } from "../../../throwError/message.service";
import { ModalDetalleAnuncio } from '../modalDetalleAnuncio/modalDetalleAnuncio.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-home',
  templateUrl: "./index.component.html",
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {

  modalRef: BsModalRef;

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
    private modalService: BsModalService
  ) { }

  FiltrarDatos(event): void {
    this.limit = 15;
    let txt_nombre_ficha = event.entidad.txt_nombre_ficha;
    let tx_servicios_ofrece = event.entidad.tx_servicios_ofrece;
    let txt_lugar_servicio_distrito = event.entidad.txt_lugar_servicio_distrito;
    let tx_lugar_atencion = event.entidad.tx_lugar_atencion;
    this.masonryImages = this.list.filter(function (event) {
      return event.txt_nombre_ficha.toLowerCase().indexOf(txt_nombre_ficha.toLowerCase()) > -1 ||
        event.txt_lugar_servicio_distrito.indexOf(txt_lugar_servicio_distrito) ||
        event.tx_servicios_ofrece.indexOf(tx_servicios_ofrece) ||
        event.tx_lugar_atencion.indexOf(tx_lugar_atencion)
    }).slice(0, this.limit);
  }

  onScrollDown() {
    this.limit += 15;
    this.masonryImages = this.list.slice(0, this.limit);
    console.log('scrolled down!!')
  }
  onScrollUp() {
    console.log('scrolled up!!')
  }
  getLisAnuncios() {
    this.homeService.getAnuncio().subscribe(
      (res: ClientResponse) => {
        this.list = JSON.parse(res.DataJson);
        this.masonryImages = this.list.slice(0, this.limit);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnInit() {
    this.getLisAnuncios();
  }
  openModalDetalleAnuncio(id: number) {
    this.modalRef = this.modalService.show(ModalDetalleAnuncio, {
      class: 'modal-lg',
      initialState: {
        title: 'Actualizar Anuncio Demo',
        data: {
          id: id
        }
      }
    });
  }
}

