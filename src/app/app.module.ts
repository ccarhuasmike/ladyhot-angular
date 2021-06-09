import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from '../app/view/not-found/not-found.component';
import { CoreModule } from '../app/view/core/core.module';
import { HomeModule } from '../app/view/home/home.module';
import { PanelControlModule } from '../app/view/panelcontrol/panelcontrol.module';
import { AnunciateGratisModule } from '../app/view/anunciategratis/anunciategratis.module';
import { RedireccionarAnuncioModule } from '../app/view/redireccionar-anuncio/redireccionar-anuncio.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'gologolos' }),    
    HomeModule,    
    PanelControlModule,
    AnunciateGratisModule,
    RedireccionarAnuncioModule,
    AppRoutingModule,    
    HttpClientModule,
    CoreModule,
    SharedModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }