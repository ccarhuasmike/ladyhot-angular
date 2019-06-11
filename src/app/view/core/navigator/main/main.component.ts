import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: ` 
    <div class="container-fluid">
      <router-outlet></router-outlet>
    </div>  
  `,
  styles: []
})
export class MainComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
