import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from '../app/view/not-found/not-found.component';
import { CoreModule } from '../app/view/core/core.module';
import { SharedModule } from './shared/shared.module';
// import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'gologolos' }),
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