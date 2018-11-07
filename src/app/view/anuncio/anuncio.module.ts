import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncioRoutingModule } from './anuncio-routing.module';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        AnuncioRoutingModule,
        FormsModule, ReactiveFormsModule
    ],
    declarations: [AnuncioComponent],
    exports: [

    ]
})
export class AnuncioModule { }
