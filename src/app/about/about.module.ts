import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { LinksComponent } from './about/links.component';
import { InfoComponent } from './about/info.component';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule
  ],
  declarations: [AboutComponent, LinksComponent, InfoComponent]
})
export class AboutModule { }
