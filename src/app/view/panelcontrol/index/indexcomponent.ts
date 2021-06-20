import { Component, OnInit,OnDestroy, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'app-coredashboard',
    templateUrl: "./index.component.html",
    styleUrls: ['./index.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit, OnDestroy {
    constructor(
    ) { }
    ngOnDestroy(): void {       
        
        localStorage.clear();
    }
    ngOnInit() {
    }
    
}
