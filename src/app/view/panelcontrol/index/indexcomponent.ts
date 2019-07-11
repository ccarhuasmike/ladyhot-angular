import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'app-coredashboard',
    templateUrl: "./index.component.html",
    styleUrls: ['./index.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class indexComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit() {
    }
    nuevoanuncionclick() {
        localStorage.removeItem('DataAnuncio');
    }
}
