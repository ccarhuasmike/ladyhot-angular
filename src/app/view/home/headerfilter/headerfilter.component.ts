import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-headerfilter',
  templateUrl: "./headerfilter.component.html"
})
export class headerfilter implements OnInit {
  nombre: string;
  // Usamos el decorador Output
  @Output() PasameElPueblo = new EventEmitter();
  ngOnInit(): void {
  }
  // Cuando se lance el evento click en la plantilla llamaremos a este método
  lanzar(event) {
    // Usamos el método emit
    debugger;
    this.PasameElPueblo.emit({ nombre: this.nombre });
  }

}