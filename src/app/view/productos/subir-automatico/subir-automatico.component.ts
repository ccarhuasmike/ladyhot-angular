import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/shared/services/producto/producto.service';

@Component({
  selector: 'app-subir-automatico',
  templateUrl: './subir-automatico.component.html',
  styleUrls: ['./subir-automatico.component.css']
})
export class SubirAutomaticoComponent implements OnInit {

  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit() {
    this.productoService.getListarProductosSubirAutomatico().subscribe(
      (res) => {
        if (res.Status == "OK") {
          let DataJsonAnuncio: any = res.Data;
          console.log(DataJsonAnuncio);
        }
      }
    );
  }

}
