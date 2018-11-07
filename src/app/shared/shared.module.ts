import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from './services/service.module';
@NgModule({
    imports: [
        CommonModule,
        ServicesModule
    ],
    declarations: []
})
export class SharedModule { }
