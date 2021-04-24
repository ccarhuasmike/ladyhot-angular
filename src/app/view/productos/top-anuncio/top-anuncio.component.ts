import { Component, OnInit } from '@angular/core';
import { PasarelaPagoService } from 'src/app/shared/services/pasarelapago/pasarelapago.service';
import { environment } from 'src/environments/environment';
import { ProductoService } from 'src/app/shared/services/producto/producto.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalPasarelaPagoComponent } from '../../pasarela-pago/modal-pasarela-pago/pasarela-pago.component';

declare var $: any;

@Component({
  selector: 'app-top-anuncio',
  templateUrl: './top-anuncio.component.html',
  styleUrls: ['./top-anuncio.component.css']
})
export class TopAnuncioComponent implements OnInit {

  modalRef: BsModalRef;

  TIPO_PRODUCTO_SUBIR_AUTOMATICO: number = 294;
  listProductoSubirAutomatico: [];
  mensajePago: String;
  nombre: String;

  constructor(
    private productoService: ProductoService,
    private modalService: BsModalService,
    private pasaPagoService: PasarelaPagoService
  ) { }

  ngOnInit() {
    this.obtenerLlavePublica();
    this.productoService.getListarProductosSubirAutomatico(this.TIPO_PRODUCTO_SUBIR_AUTOMATICO).subscribe(
      (res) => {
        if (res.Status == "OK") {
          this.listProductoSubirAutomatico = JSON.parse(res.DataJson);
          //this.listProductoPlanSubidas = [];
          //this.listProductoSubirAutomatico.forEach((item) => {
          //  if (item["posicion_plan_subida"] > 0) {
          //    this.listProductoPlanSubidas.push(item);
          //  }
          //});
          //this.listProductoPlanSubidas.sort((a, b) => a["posicion_plan_subida"] - b["posicion_plan_subida"]);
          console.log(this.listProductoSubirAutomatico);
          //this.poblarMasProducto();
          //this.CANTIDAD_PRODUCTOS_POR_FILA = Math.ceil(this.listProductoSubirAutomatico.length / this.CANTIDAD_PRODUCTOS_POR_FILA);
          //console.log(this.listProductoSubirAutomatico);
          //console.log(":::::: TAMAÑO ::::::" + this.listProductoSubirAutomatico.length);
          //}
        }
      });

    var cargaEventos = setInterval(function () {
      if ($(".producto").length > 0) {
        clearInterval(cargaEventos);
        loadScripts();
      }
    }, 200);

    function loadScripts() {
      const dynamicScripts = [
        '../../../assets/js/top-anuncios.js'
      ];
      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }
    }
  }

  modalPagar() {
    let dataSubirAutomatico = JSON.parse(sessionStorage.getItem("dataSubirAutomatico"));
    let bodyProductSeleccionado = {
      tipoProducto: 'ta',
      diasActivo: $(".producto.producto_selected").find(".dias").html(),
      precio: $(".producto.producto_selected").find(".precio").html(),
      precioUnitario: $(".producto.producto_selected").find(".precio_unitario").html(),
      idProducto: $(".producto.producto_selected").data("codigo-producto"),
      idAnuncio: dataSubirAutomatico.idAnuncio,
      primerDiaSubida: $("#fecha_inicial").val(),
      ultimoDiaSubida: $("#fecha_final").val(),
      //primerHoraSubida: $("#hora_inicio").val(),
      //ultimoHoraSubida: $("#hora_fin").val()
    };
    this.modalRef = this.modalService.show(ModalPasarelaPagoComponent, {
      class: 'modal-md',
      initialState: {
        title: 'Pasarale Pago',
        data: {
          foto: dataSubirAutomatico.foto,
          titulo: dataSubirAutomatico.titulo,
          montoPagar: $('.precio', $(".producto_selected")).text(),
          bodyProductSeleccionado: JSON.stringify(bodyProductSeleccionado),
          descripcionCargo: 'Cobro para publicitarse en el GoloGolos'
        }
      }
    });

    this.modalRef.content.onClose.subscribe(result => {
      this.mensajePago = result;
      this.nombre = dataSubirAutomatico.titulo;
      var cargaEventos = setInterval(function () {
        if ($("#success-alert").length > 0) {
          clearInterval(cargaEventos);
          $("#success-alert").fadeTo(2000, 1000).slideUp(1000, function () {
            $("#success-alert").slideUp(1000);
          });
        }
      }, 200);
      console.log('results', result);
    });
  }

  obtenerLlavePublica() {
    if (sessionStorage.getItem("LLAVE_PUBLICA") == null) {
      this.pasaPagoService.obtenerLlavePublica().subscribe(
        (res) => {
          sessionStorage.setItem("LLAVE_PUBLICA", res.DataJson);
          environment.stripeKey = res.DataJson;
        }
      );
    } else {
      environment.stripeKey = sessionStorage.getItem("LLAVE_PUBLICA");
    }
  }
}