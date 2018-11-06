import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: "./footer.component.html",
  styles: []
})
export class FooterComponent implements OnInit {
  public title = 'autobot';
  public version = '2-spa';
  public tag = '2.0.0';
  constructor() { }

  ngOnInit() { }
}
