import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  dataSubirAutomatico: any;
  constructor() { }

  ngOnInit() {
    this.dataSubirAutomatico = JSON.parse(sessionStorage.getItem("dataSubirAutomatico"));
  }

}
