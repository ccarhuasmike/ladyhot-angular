import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncioService } from './anuncio/anuncio.service';
import { StepService } from './anuncio/step.service';
import { HeaderService } from './header/header.services';
import { ConfigService } from './Utilitarios/config.service';
import { HomeService } from './anuncio/home.services';
import { ParameterService } from './anuncio/parameter.service';
import { UbigeoService } from './ubigeo/ubigeo.service';
import { ContactarService } from './anuncio/contactar.service';
import { SeguridadService } from './seguridad/seguridad.service';
import { UsuarioService } from './usuario/usuario.service';
import { MantenimientoAnuncioService } from './mantenimiento-anuncio/mantenimiento-anuncio.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SeoService } from './seo/seo.service';
import { SEOFacebookService } from './seofacebook/seofacebook.service';
// import { LoaderInterceptor } from '../../shared/services/loader/loader.interceptor';


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
        ParameterService,
        ContactarService,
        UbigeoService,
        SeguridadService,
        UsuarioService,
        MantenimientoAnuncioService,
        SeoService,
        SEOFacebookService
    ]
})
export class ServicesModule { }
export {
    AnuncioService,
    HeaderService,
    StepService,
    HomeService,
    UbigeoService,
    ParameterService
}
