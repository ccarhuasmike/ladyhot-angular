import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/shared/services/producto/producto.service';

declare var $: any;

@Component({
  selector: 'app-subir-automatico',
  templateUrl: './subir-automatico.component.html',
  styleUrls: ['./subir-automatico.component.css']
})
export class SubirAutomaticoComponent implements OnInit {

  TIPO_PRODUCTO_SUBIR_AUTOMATICO: number = 293;
  CANTIDAD_PRODUCTOS_POR_FILA: number = 3;
  listProductoSubirAutomatico: [];
  listProductoPlanSubidas: any;
  muestraSaltoLinea: boolean = false;
  htmlMasProductos: String = "";

  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit() {
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
          this.poblarMasProducto();
          this.CANTIDAD_PRODUCTOS_POR_FILA = Math.ceil(this.listProductoSubirAutomatico.length / this.CANTIDAD_PRODUCTOS_POR_FILA);
          console.log(this.listProductoSubirAutomatico);
          console.log(":::::: TAMAÑO ::::::" + this.listProductoSubirAutomatico.length);
        }
      }
    );

    $(document).ready(function () {

      $('#productos').on('click', '.destacados .vermas', function () {
        $(this).toggleClass('menos');
        $('.destacados + div').toggleClass('vertodo');
      });

    });

  }

  poblarMasProducto() {
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
      this.htmlMasProductos += '<div class="producto" id="SU7X12">';
      this.htmlMasProductos += '<span class="dias"><b>';
      this.htmlMasProductos += this.listProductoSubirAutomatico[i]['numero_dias_activo'];
      this.htmlMasProductos += '</b> días<br /><b>';
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
  }
}