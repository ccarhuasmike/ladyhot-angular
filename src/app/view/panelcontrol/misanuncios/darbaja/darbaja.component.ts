import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/shared/services/service.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/services/Utilitarios/config.service';
import { Location } from '@angular/common';
import { ClientResponseResult } from 'src/app/Models/ClientResponseModels';
@Component({
    selector: 'app-darBaja',
    templateUrl: './darbaja.component.html',
    styleUrls: ['./darbaja.component.css']
})
export class DarBajaComponent implements OnInit {

    _baseUrl: string = '';
    nombre: string = '';
    idEncrypt: string;

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
            (res: ClientResponseResult<any>) => {
                this.nombre = res.result.DetailleAnuncion.txt_nombre_ficha;
                this.idEncrypt = res.result.DetailleAnuncion.cod_anuncio_encryptado;
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
