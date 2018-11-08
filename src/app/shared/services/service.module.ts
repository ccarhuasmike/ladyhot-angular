import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncioService } from './anuncio/anuncio.service';
import { HeaderService } from './header/header.services';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [AnuncioService, HeaderService]
})
export class ServicesModule { }
export {
    AnuncioService,
    HeaderService
}
