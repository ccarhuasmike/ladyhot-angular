import { Component, OnInit } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { HeaderService } from "../../../shared/services/header/header.services";

@Component({
  selector: 'app-navigator',
  template: `    
    <app-main></app-main>    
  `,
  styles: []
})
export class NavigatorComponent implements OnInit {
  constructor(
  ) { }


  // <app-header ></app-header>    
  // <app-main></app-main>
  // <app-footer></app-footer>

  ngOnInit() {

  }
}
