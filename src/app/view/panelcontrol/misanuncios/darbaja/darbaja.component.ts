import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/shared/services/service.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/services/Utilitarios/config.service';
import { Location } from '@angular/common';
import { ClientResponse } from 'src/app/Models/ClientResponseModels';
@Component({
    selector: 'app-darBaja',
    templateUrl: './darbaja.component.html',
    styleUrls: ['./darbaja.component.css']
})
export class DarBajaComponent implements OnInit {

    _baseUrl: string = '';
    nombre: string = '';
    idEncrypt: string;
    txt_imagen_prensetancion: string;
    constructor(
        private anuncioService: AnuncioService,
        private route: ActivatedRoute,
        private configService: ConfigService,
        private router: Router,
        private _location: Location
    ) {
        this._baseUrl = configService.getWebApiURL();
    }

    ngOnInit() {
        this.anuncioService.getAnuncioPorId(this.route.params["value"]["id"]).subscribe(
            (res: ClientResponse) => {

                console.log(res);
                // this.nombre = res.result.DetailleAnuncion.txt_nombre_ficha;
                // this.idEncrypt = res.result.DetailleAnuncion.cod_anuncio_encryptado;
                // this.txt_imagen_prensetancion = res.result.DetailleAnuncion.txt_imagen_prensetancion;
            });
    }

    cancelarMiAnuncio() {
        this._location.back();
    }

    eliminarMiAnuncio() {
        let entidad: any = {};
        entidad.cod_anuncio_encryptado = this.idEncrypt;
        this.anuncioService.darBajaMiAnuncio(entidad).subscribe(
            (res) => {
                if (res.Status == "OK") {
                    this.router.navigate(['panelcontrol/misanuncios']);
                } else {
                    console.log("ejecute Error");
                }
            }
        );
    }
}
