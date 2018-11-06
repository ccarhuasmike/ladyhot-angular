import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncioRoutingModule } from './anuncio-routing.module';
import { AnuncioComponent } from './anuncio/anuncio.component';


@NgModule({
    imports: [
        CommonModule,
        AnuncioRoutingModule
    ],
    declarations: [AnuncioComponent]
})
export class AnuncioModule { }
