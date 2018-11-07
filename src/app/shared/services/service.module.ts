import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncioService } from './anuncio/anuncio.service';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [AnuncioService]
})
export class ServicesModule { }
export {
    AnuncioService
}
