import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
  <main class="section" style="margin-top: 64px;">
    <div class="container-fluid">
      <router-outlet></router-outlet>
    </div>
  </main>
  `,
  styles: []
})
export class MainComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
