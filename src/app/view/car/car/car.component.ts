import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  template: `
  <br>
  <div class="card">
    <header class="card-header">
      <div class="card-header-title">
        {{ carId }}
      </div>
      <a [routerLink]="['/']"  aria-label="home" class="button is-info is-outlined"> <-   </a>
    </header>
    <div class="card-content">
      <div class="content">
        Current speed : 0 km/h
        Traveled : 0 km
      </div>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <button class="button is-danger is-outlined">Brake</button>
      </div>
      <div class="card-footer-item">
        <button class="button is-primary is-outlined">Throttle</button>
      </div>
    </footer>
  </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarComponent implements OnInit {
  public carId;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.carId = this.route.snapshot.params['carId'];
  }
}
