import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from '../app/view/not-found/not-found.component';
import { CoreModule } from '../app/view/core/core.module';
import { SharedModule } from './shared/shared.module';
// import { IndexComponent } from "../app/view/home/index/index.component";
// import { NgxMasonryModule } from 'ngx-masonry';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    //IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,    
    CoreModule,
    SharedModule,
    // NgxMasonryModule,
    // InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
