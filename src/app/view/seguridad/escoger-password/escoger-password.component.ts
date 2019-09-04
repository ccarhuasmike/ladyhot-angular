import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-escoger-password',
    templateUrl: "./escoger-password.component.html",
    styleUrls: ['../css/global.component.css']
})
export class EscogerPasswordComponent implements OnInit {
    public token;
    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        //http://localhost:4200/seguridad/EscogerPassword/C107A5F9-6B3F-4158-B928-4EDFCC422B90
        this.token = this.route.snapshot.params['token'];
        console.log(this.token);
    }
    
}