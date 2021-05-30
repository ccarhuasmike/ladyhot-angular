import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalModule } from "ngx-bootstrap/modal";
import { LightboxComponent } from "../componentes-reusable/lightbox/lightbox.component";
import { DetalleAnuncioComponent } from "../componentes-reusable/detalle-anuncio/detalle-anuncio.component";

@NgModule({
    imports: [CommonModule, ModalModule.forRoot()],
    declarations: [LightboxComponent, DetalleAnuncioComponent],
    exports: [LightboxComponent, DetalleAnuncioComponent],
    entryComponents: [
        DetalleAnuncioComponent,
        LightboxComponent
    ],
  })
  export class DetalleAnuncioReusableModule {
  }