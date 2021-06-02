import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from '../app/view/not-found/not-found.component';
import { CoreModule } from '../app/view/core/core.module';

import { HomeModule } from '../app/view/home/home.module';
import { AboutModule } from '../app/view/about/about.module';
import { PanelControlModule } from '../app/view/panelcontrol/panelcontrol.module';
import { AnunciateGratisModule } from '../app/view/anunciategratis/anunciategratis.module';
import { RedireccionarAnuncioModule } from '../app/view/redireccionar-anuncio/redireccionar-anuncio.module';

import { SharedModule } from './shared/shared.module';
// import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'gologolos' }),
    
    HomeModule,
    AboutModule,
    PanelControlModule,
    AnunciateGratisModule,
    RedireccionarAnuncioModule,

    AppRoutingModule,
    //HttpModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    //ModuleMapLoaderModule
  ],
  
  providers: [
    // provideModuleMap(LAZY_MODULE_MAP) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }