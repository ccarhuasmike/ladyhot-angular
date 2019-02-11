import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/shared/services/service.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/services/Utilitarios/config.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-darBaja',
    templateUrl: './darbaja.component.html',
    styleUrls: ['./darbaja.component.css']
})
export class DarBajaComponent implements OnInit {

    _baseUrl: string = '';
    nombre: string = '';

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
        this.nombre = this.route.snapshot.paramMap.get("nombre");
    }

    cancelarMiAnuncio() {
        this._location.back();
    }

    eliminarMiAnuncio() {
        this.anuncioService.darBajaMiAnuncio(this.route.snapshot.paramMap.get("id")).subscribe(
            (res) => {
                console.log(res);
                if (res.Status == "OK") {
                    this.router.navigate(['DashboardAnuncion/misanuncios']);
                } else {
                    console.log("ejecute Error");
                }
            }
        );
    }
}
