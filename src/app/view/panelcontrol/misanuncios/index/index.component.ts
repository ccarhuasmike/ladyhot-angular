import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AnuncioService } from 'src/app/shared/services/service.module';
import { ConfigService } from 'src/app/shared/services/Utilitarios/config.service';
import { ClientResponse, ClientResponseResult } from 'src/app/Models/ClientResponseModels';
import { Tbl_anuncio } from 'src/app/Models/Tbl_anuncioModels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-misanuncios',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  _baseUrl: string = '';
  listaMisAnuncios: any;
  anuncioSelected: Tbl_anuncio;

  constructor(
    private router: Router,
    private anuncioService: AnuncioService,
    private configService: ConfigService) {
    this._baseUrl = configService.getWebApiURL();
  }

  ngOnInit() {
    let DataUsuarioLogeado: any = JSON.parse(localStorage.getItem('DataUsuarioLogeado')); //Se Obtiene los datos del usuario logeado
    let entidad: any = {};
    debugger;
    entidad.id_usuario = DataUsuarioLogeado.id;
    this.anuncioService.getListarMisAnuncios(entidad).subscribe(
      (res: ClientResponse) => {
        debugger;
        this.listaMisAnuncios = JSON.parse(res.DataJson);
      }
    );
  }

  editarMiAnuncio(anuncio: Tbl_anuncio) {
    this.anuncioSelected = anuncio;
    this.router.navigate(["/panelcontrol/misanuncios/editar", this.anuncioSelected.id]);
  }
  galeriaMiAnuncio(anuncio: Tbl_anuncio) {
    this.anuncioSelected = anuncio;
    this.router.navigate(["/panelcontrol/misanuncios/galeria", this.anuncioSelected.id]);
  }
  darBajaMiAnuncio(anuncio: Tbl_anuncio) {
    this.anuncioSelected = anuncio;
    //{ data: { id: this.anuncioSelected.cod_anuncio_encryptado, nombre: this.anuncioSelected.txt_nombre_ficha } }
    this.router.navigate(["/panelcontrol/misanuncios/darbaja", this.anuncioSelected.id]);
  }
}
