import { Component, OnInit } from '@angular/core';
declare const cdFilter: any;
declare const cdClose: any;
@Component({
  selector: 'app-filter',
  templateUrl: "./filter.component.html"
})
export class FilterComponent implements OnInit {
  constructor(
  ) { }
 
  ngOnInit() {
    
  }
  onFilterClick() {
    debugger;
    cdFilter();
  }
  onCloseClick() {
    debugger;
    cdClose();
  }
}

