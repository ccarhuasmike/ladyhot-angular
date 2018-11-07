import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <h1 class="title">Angular sample simple project </h1>
    <nav class="navbar" role="navigation" aria-label="about nested navigation">
      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <a class="navbar-item"  [routerLink]="['./links']"> Links</a>
          <a class="navbar-item"  [routerLink]="['./info']"> Info</a>
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
