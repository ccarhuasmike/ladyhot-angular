import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
@Component({
    selector: 'app-galeria',
    templateUrl: '/galeria.component.html',
    styleUrls: ['./galeria.component.css']

})
export class GaleriaComponent implements OnInit {

    constructor(
        private anuncioService: AnuncioService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.anuncioService.segundopaso(true);
        this.anuncioService.tercerpaso(true);
        this.anuncioService.cuartopaso(true);
        this.anuncioService.quintopaso(true);
        this.anuncioService.sextopaso(true);
    }
    btnAtras() {
        this.router.navigate(['/anuncio/servicios']);
    }
}
