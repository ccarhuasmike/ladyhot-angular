import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

declare var $: any;

@Component({
  selector: 'app-modal-lightbox',
  templateUrl: './modal-lightbox.component.html',
  styleUrls: ['./modal-lightbox.component.css']
})
export class ModalLightboxComponent implements OnInit {

  imagesDetalleGaleria: String;

  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
    // this.imagesDetalleGaleria = this["data"]["imagesDetalleGaleria"];

    // var cargaEventos = setInterval(function () {
    //   clearInterval(cargaEventos);
    //   loadScripts();
    // }, 500);

    // function loadScripts() {
    //   const dynamicScripts = [
    //     'https://code.jquery.com/jquery-3.4.1.js',
    //     'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
    //     //'assets/js/jquery.min.js',
    //     //'assets/js/bootstrap.min.js'
    //   ];
    //   for (let i = 0; i < dynamicScripts.length; i++) {
    //     const node = document.createElement('script');
    //     node.src = dynamicScripts[i];
    //     node.type = 'text/javascript';
    //     node.async = false;
    //     node.charset = 'utf-8';
    //     $('.modal-dialog.modal-md.modal-dialog-centered').find(".modal-body").parent().append(node);
    //   }
    // }
  }
}