import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FiltroComponent } from "../componentes-reusable/filtro/filtro.component";
import { NavegacionComponent } from "../componentes-reusable/navegacion/navegacion.component";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "../componentes-reusable/header/header.component";
import { ContactarComponent } from "../componentes-reusable/contactar/contactar.component";
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [
    NavegacionComponent,
    FiltroComponent,
    HeaderComponent,
    ContactarComponent,
  ],
  exports: [
    NavegacionComponent,
    FiltroComponent,
    HeaderComponent,
    ContactarComponent,
  ],
})
export class HeaderReusableModule {}