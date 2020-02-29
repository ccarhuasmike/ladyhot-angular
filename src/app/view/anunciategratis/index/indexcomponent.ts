import { Component, OnInit,OnDestroy, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'app-coreanunciategratis',
    templateUrl: "./index.component.html",
    styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {        
        localStorage.clear();
    }
    constructor(
    ) { }
    ngOnInit() {
        debugger;
    }    
}
