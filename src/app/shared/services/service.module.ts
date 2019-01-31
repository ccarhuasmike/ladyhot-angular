import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncioService } from './anuncio/anuncio.service';
import { StepService } from './anuncio/step.service';
import { HeaderService } from './header/header.services';
import { ConfigService } from './Utilitarios/config.service';
import { HomeService } from './anuncio/home.services';
import { ParameterService } from './anuncio/parameter.service';
import { HttpErrorHandler } from '../../throwError/http-error-handler.service';
import { MessageService } from '../../throwError/message.service';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        AnuncioService,
        HeaderService,
        StepService,
        HomeService,
        ConfigService,
        HttpErrorHandler,
        MessageService,
        ParameterService
    ]
})
export class ServicesModule { }
export {
    AnuncioService,
    HeaderService,
    StepService,
    HomeService,
    ParameterService
}
