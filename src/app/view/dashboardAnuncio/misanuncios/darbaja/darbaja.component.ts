import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AnuncioService } from 'src/app/shared/services/service.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/services/Utilitarios/config.service';

@Component({
    selector: 'app-darBaja',
    templateUrl: './darbaja.component.html',
    styleUrls: ['./darbaja.component.css']
})
export class DarBajaComponent implements OnInit {

    _baseUrl: string = '';

    constructor(
        private anuncioService: AnuncioService,
        private route: ActivatedRoute,
        private configService: ConfigService,
        private router: Router
    ) {
        this._baseUrl = configService.getWebApiURL();
    }

    ngOnInit() {
        console.log(this.route.params["value"]["id"]);
    }

    regresarMisAnuncios() {
        this.router.navigate(['DashboardAnuncion/misanuncios']);
    }

    eliminarMiAnuncio() {
        this.anuncioService.darBajaMiAnuncio(this.route.params["value"]["id"]).subscribe(
            (res) => {
                console.log(res);
                if (res.Status == "OK") {
                    let DataJsonAnuncio: any = res.Data;
                    //localStorage.setItem('DataAnuncio', DataJsonAnuncio);
                    this.router.navigate(['DashboardAnuncion/misanuncios']);
                } else {
                    console.log("ejecute Error");
                }
            }
        );
    }
}
