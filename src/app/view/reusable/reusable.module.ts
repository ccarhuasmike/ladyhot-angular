import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalModule } from "ngx-bootstrap";
import { LightboxComponent } from "../lightbox/lightbox.component";
import { DetalleAnuncioComponent } from "../redireccionar-anuncio/detalle-anuncio/detalle-anuncio.component";

@NgModule({
    imports: [CommonModule, ModalModule.forRoot()],
    declarations: [LightboxComponent, DetalleAnuncioComponent],
    exports: [LightboxComponent, DetalleAnuncioComponent],
    entryComponents: [
        DetalleAnuncioComponent,
        LightboxComponent
    ],
  })
  export class ReusableModule {
  }