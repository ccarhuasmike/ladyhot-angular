import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/shared/services/producto/producto.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalPasarelaPagoComponent } from '../../pasarela-pago/modal-pasarela-pago/pasarela-pago.component';
import { PasarelaPagoService } from 'src/app/shared/services/pasarela-pago/pasarela-pago';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-subir-automatico',
  templateUrl: './subir-automatico.component.html',
  styleUrls: ['./subir-automatico.component.css']
})
export class SubirAutomaticoComponent implements OnInit {

  modalRef: BsModalRef;

  TIPO_PRODUCTO_SUBIR_AUTOMATICO: number = 293;
  CANTIDAD_PRODUCTOS_POR_FILA: number = 3;
  listProductoSubirAutomatico: [];
  listProductoPlanSubidas: any;
  muestraSaltoLinea: boolean = false;
  htmlMasProductos: String = "";

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
          this.listProductoPlanSubidas = [];
          this.listProductoSubirAutomatico.forEach((item) => {
            if (item["posicion_plan_subida"] > 0) {
              this.listProductoPlanSubidas.push(item);
            }
          });
          this.listProductoPlanSubidas.sort((a, b) => a["posicion_plan_subida"] - b["posicion_plan_subida"]);
          console.log(this.listProductoPlanSubidas);
          //this.poblarMasProducto();
          this.CANTIDAD_PRODUCTOS_POR_FILA = Math.ceil(this.listProductoSubirAutomatico.length / this.CANTIDAD_PRODUCTOS_POR_FILA);
          console.log(this.listProductoSubirAutomatico);
          console.log(":::::: TAMAÑO ::::::" + this.listProductoSubirAutomatico.length);
        }
      }
    );

    $(document).ready(function () {

      var animar_formas_pago = true;
      var $vermas = $('#productos .destacados .vermas');

      $('#productos').on('click', '.destacados .vermas', function () {
        $(this).toggleClass('menos');
        $('.destacados + div').toggleClass('vertodo');
      });

      /* PRODUCTOS ***************************************************************************************************************/
      $('#productos').on('click', '.producto', function () {
        var $this = $(this);
        if ($this.hasClass('producto_selected')) return;

        $('.producto_selected').removeClass('producto_selected');
        $this.addClass('producto_selected'); //Marcar como seleccionado

        //Desplegar "ver mas productos" si fuera necesario
        if (!$this.is(':visible') && $vermas.length) $vermas.click();

        //Mostrar formularios pago
        if (animar_formas_pago) {
          $('#formas_pago').slideDown(300, function () {
            $('html, body').animate({
              scrollTop: $(".paso").eq(1).offset().top - $('#cabecera').outerHeight(true)
            }, 1000);
          });
        }
        else $('#formas_pago').css('display', 'block');

        $('#precio').text($('.precio', this).text()); //Precio total

        $('#coste_total').css('display', 'block');
        //$('.elegir_forma_pago').css('display', $(' > *', $pagar).length > 1 ? 'block' : 'none');{}

        $this.trigger('selected');
      });

      function agregarSaltoLineaProducto() {
        var timeoutProducto = setTimeout(() => {
          if ($(".masProductos").find(".producto").length > 0) {
            let indexItem: any = 0;
            let divisiblePorTres;
            let vecesAgrupadasEnTres = 1;
            let CANTIDAD_PRODUCTOS_POR_FILA = 3;
            var productos = $(".masProductos").find(".producto");
            for (var i = 0; i < productos.length; i++) {
              indexItem = i + 1;
              divisiblePorTres = indexItem % CANTIDAD_PRODUCTOS_POR_FILA;
              if ((divisiblePorTres === 0 ? true : false) && vecesAgrupadasEnTres < CANTIDAD_PRODUCTOS_POR_FILA) {
                $(productos[i])[0].outerHTML = $(productos[i])[0].outerHTML + "<br/>";
                vecesAgrupadasEnTres = vecesAgrupadasEnTres + 1;
              }
            }
            clearTimeout(timeoutProducto);
          } else {
            clearTimeout(timeoutProducto);
            agregarSaltoLineaProducto();
          }
        }, 100);
      }

      agregarSaltoLineaProducto();
    });

  }

  /*poblarMasProducto() {
    let indexItem: any = 0;
    let divisiblePorTres;
    let vecesAgrupadasEnTres = 1;
    let monto;
    let diasActivo;
    let diasSubidaTop;
    let precioPorDia;
    for (var i = 0; i < this.listProductoSubirAutomatico.length; i++) {
      indexItem = i + 1;
      divisiblePorTres = indexItem % this.CANTIDAD_PRODUCTOS_POR_FILA;
      monto = this.listProductoSubirAutomatico[i]['mt_monto'];
      diasActivo = this.listProductoSubirAutomatico[i]['numero_dias_activo'];
      diasSubidaTop = this.listProductoSubirAutomatico[i]['numero_subida_top'];
      precioPorDia = (monto / diasActivo);
      this.htmlMasProductos += '<div class="producto" id="SU7X12" codigo-producto="' + this.listProductoSubirAutomatico[i]['id_producto'] + '">';
      this.htmlMasProductos += '<span class="dias"><b>';
      this.htmlMasProductos += this.listProductoSubirAutomatico[i]['numero_dias_activo'];
      this.htmlMasProductos += '</b> d&iacute;as<br /><b>';
      this.htmlMasProductos += this.listProductoSubirAutomatico[i]['numero_subida_top'];
      this.htmlMasProductos += '</b> subidas/d&iacute;a</span><span class="precio_tachado"></span><span class="precio">'
      this.htmlMasProductos += 'S/.';
      this.htmlMasProductos += this.listProductoSubirAutomatico[i]['mt_monto'];
      this.htmlMasProductos += '</span><span class="precio_unitario">';
      this.htmlMasProductos += 'S/. ' + parseFloat((precioPorDia / diasSubidaTop).toString()).toFixed(2);
      this.htmlMasProductos += ' / subida</span><span class="seleccionar">Contratar</span><input type="hidden" name="ID_PRODUCTO" value="831e8dee866e1c20680a396fec22db1c"/>';
      this.htmlMasProductos += '</div>';
      if ((divisiblePorTres === 0 ? true : false) && vecesAgrupadasEnTres < this.CANTIDAD_PRODUCTOS_POR_FILA) {
        this.htmlMasProductos += '<br/>';
        vecesAgrupadasEnTres = vecesAgrupadasEnTres + 1;
      }
    }
  }*/

  modalPagar() {
    let dataSubirAutomatico = JSON.parse(sessionStorage.getItem("dataSubirAutomatico"));
    let bodyProductSeleccionado = {
      tipoProducto: 'sa',
      diasActivo: $(".producto.producto_selected").find(".dias").html(),
      precio: $(".producto.producto_selected").find(".precio").html(),
      precioUnitario: $(".producto.producto_selected").find(".precio_unitario").html(),
      idProducto: $(".producto.producto_selected").data("codigo-producto"),
      idAnuncio: dataSubirAutomatico.idAnuncio
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
          descripcionCargo: 'Cobro para publicitarse en el LadyHot'
        }
      }
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