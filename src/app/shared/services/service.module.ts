import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncioService } from './anuncio/anuncio.service';
import { StepService } from './anuncio/step.service';
import { HeaderService } from './header/header.services';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [AnuncioService, HeaderService, StepService]
})
export class ServicesModule { }
export {
    AnuncioService,
    HeaderService,
    StepService
}
