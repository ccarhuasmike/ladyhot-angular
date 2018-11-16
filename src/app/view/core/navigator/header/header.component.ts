import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderService } from "../../../../shared/services/header/header.services";
@Component({
  selector: 'app-header',
  templateUrl: "./header.component.html",
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public title = 'autobot';
  public version = '2-spa';
  public tag = '2.0.0';
  show: boolean = false;
  constructor(
    public _router: Router
  ) {
  }
  toggleCollapse() {
    this.show = !this.show
  }
  ngOnInit() {

  }
}
