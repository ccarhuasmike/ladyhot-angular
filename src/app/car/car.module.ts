import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from './car/car.component';

@NgModule({
  imports: [
    CommonModule,
    CarRoutingModule
  ],
  declarations: [CarComponent]
})
export class CarModule { }
