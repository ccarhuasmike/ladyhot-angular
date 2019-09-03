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
import { ContactarService } from './anuncio/contactar.service';
import { SeguridadService } from './seguridad/seguridad.service';
import { UsuarioService } from './usuario/usuario.service';
import { MantenimientoAnuncioService } from './mantenimiento-anuncio/mantenimiento-anuncio.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { LoaderInterceptor } from '../../shared/services/loader/loader.interceptor';
import { LoaderService } from "../../shared/services/loader/loader.service";


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
        ParameterService,
        ContactarService,
        SeguridadService,
        UsuarioService,
        MantenimientoAnuncioService,
        LoaderService
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
