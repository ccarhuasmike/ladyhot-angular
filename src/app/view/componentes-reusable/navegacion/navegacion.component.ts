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

    (function(){
      let divFilter = document.getElementById('cd-tab-filter');
      let liEvent = divFilter.getElementsByTagName("li");
      for(let i=0; i<liEvent.length; i++){
        liEvent[i].onclick = function(event){
          //mobile version - detect click event on filters tab
          let filter_tab_placeholder = divFilter.getElementsByClassName('placeholder')[0].getElementsByTagName('a')[0];
          if(Object.is(event.target,filter_tab_placeholder)){
            divFilter.classList.toggle('is-open');
          }
        }
      }
    })();
  }
}