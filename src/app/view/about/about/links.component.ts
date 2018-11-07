import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-links',
  template: `
  <h2 class="subtitle">Links to learn Angular: </h2>
  <ul>
    <li>
      <h2><a target="_blank" rel="noopener" href="https://academia-binaria.com/hola-angular-cli/">Tutorial en español</a></h2>
    </li>
    <li>
      <h2><a target="_blank" rel="noopener" href="https://github.com/AcademiaBinaria/autobot/tree/0-hello">GitHub Repository</a></h2>
    </li>
    <li>
      <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
    </li>
  </ul>
  `,
  styles: []
})
export class LinksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
