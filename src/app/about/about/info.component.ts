import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  template: `
    <h2 class="subtitle">
      Play with cars...
    </h2>
  `,
  styles: []
})
export class InfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
