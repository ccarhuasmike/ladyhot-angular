import { Component, OnInit } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { HeaderService } from "../../../shared/services/header/header.services";

@Component({
  selector: 'app-navigator',
  template: `
    <app-header ></app-header>    
    <app-main></app-main>
    <app-footer></app-footer>
  `,
  styles: []
})
export class NavigatorComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit() {

  }
}
