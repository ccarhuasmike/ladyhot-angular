import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { debug } from 'util';
// import { BehaviorSubject } from 'rxjs';
// import { HeaderService } from "../../../shared/services/header/header.services";

@Component({
    selector: 'app-coredashboard',
    templateUrl: "./index.component.html",
    styleUrls: ['./index.component.css']
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
