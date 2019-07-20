import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
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

  showPueblo(event): void {
    alert(event.nombre);
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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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

