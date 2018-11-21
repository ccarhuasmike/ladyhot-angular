import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from "../../shared/services/header/header.services";
import { HeaderComponent } from "../core/navigator/header/header.component";
@Component({
    selector: 'app-panel',
    templateUrl: "./panelcontrol.component.html",
    styleUrls: ['./panelcontrol.component.css']
})
export class PanelControlComponent implements OnInit {
    @ViewChild(HeaderComponent) hijo: HeaderComponent;
    constructor(private headerService: HeaderService) {
    }
    ngOnInit() {
        //this.headerService.setShowMenu(false);
    }
}
