import { Component, OnInit } from '@angular/core';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-anuncio',
    templateUrl: "./index.component.html",
    styleUrls: ['./index.component.css']
})
export class AnuncioComponent implements OnInit {

    EdadId: Number = 0;
    PaisId: Number = 0;
    EstudioId: Number = 0;
    CabelloId: Number = 0;
    OjosId: Number = 0;
    EstaturaId: Number = 0;
    PesoId: Number = 0;

    constructor(
        private anuncioService: AnuncioService,
        private router: Router        
    ) { }
    ngOnInit() {
        //this.router.navigate(['/anuncio/servicios']);
    }
}


