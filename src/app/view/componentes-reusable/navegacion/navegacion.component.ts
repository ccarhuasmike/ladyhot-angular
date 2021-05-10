import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navegacion',
  templateUrl: "./navegacion.component.html",
  styleUrls: ['./navegacion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavegacionComponent implements OnInit {

  status: boolean = false;
  selectedHome:string = "";
  selectedAnuncioGratis:string = "";
  
  constructor(
    private location: Location
  ) {
  }

  ngOnInit() {
    let path = this.location.path().substr(this.location.path().lastIndexOf('/') + 1);
    switch(path){
      case "home":
        this.selectedHome = "selected";
        break;
      case "datos-contacto":
          this.selectedAnuncioGratis = "selected";
          break;
      default:
        this.selectedHome = "selected";    
    }
  }
}