import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
    selector: 'app-darBaja',
    templateUrl: './darbaja.component.html',
    styleUrls: ['./darbaja.component.css']
})
export class DarBajaComponent implements OnInit {

    constructor(
        private router: Router,
        private _location: Location
    ) { }

    ngOnInit() {
    }
    cancelar() {
        this._location.back();
        //this.router.navigate(["/DashboardAnuncion/misanuncios/"]);
    }
    borra_anuncio() {
        alert('sss');
    }
}
