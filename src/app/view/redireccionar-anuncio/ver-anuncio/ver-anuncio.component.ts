import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Location } from '@angular/common';

@Component({
    selector: 'ver-anuncio',
    templateUrl: "./ver-anuncio.component.html",
    styleUrls: ['./ver-anuncio.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class VerAnuncioComponent implements OnInit {

    idAnuncio:string;

    constructor(private location: Location){
        
        let id = this.location.path().split("-")[this.location.path().split("-").length - 1] ;///[0-9]+/g.exec(this.location.path()).toString();
        this.idAnuncio = id;
    }

    ngOnInit(): void {
    }
}