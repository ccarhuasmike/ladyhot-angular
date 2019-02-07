import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { debug } from 'util';
// import { BehaviorSubject } from 'rxjs';
// import { HeaderService } from "../../../shared/services/header/header.services";

@Component({
    selector: 'app-coredashboard',
    templateUrl: "./coredashboard.component.html",
    styleUrls: ['./coredashboard.component.css']
})
export class CoreDashboardComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit() {
    }
    nuevoanuncionclick() {
        debugger;
        localStorage.removeItem('DataAnuncio');
    }
}
