import { Component, OnInit } from '@angular/core';
import { StepService } from "../../../../shared/services/anuncio/step.service";

@Component({
    selector: 'app-navbar-tab',
    templateUrl: './navbar-tab.component.html'
})
export class NavBarTabComponent implements OnInit {
    constructor(public step: StepService
    ) {
        console.log(this.step);
    }

    ngOnInit() {
        console.log(this.step);
    }
}
