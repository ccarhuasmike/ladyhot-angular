import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { ImageService } from 'src/app/shared/services/Utilitarios/image.service';
import { ReusableModule } from '../reusable/reusable.module';
import { HeaderReusableModule } from '../reusable/header-reusable.module';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        NgxMasonryModule,
        InfiniteScrollModule,
        FormsModule,
        ReactiveFormsModule,
        // Register module
        NgxJsonLdModule,
        ReusableModule,
        HeaderReusableModule
    ],
    declarations: [
        IndexComponent,        
    ],
    exports: [IndexComponent],
    bootstrap: [IndexComponent],
    providers: [
        ImageService        
    ],
})
export class HomeModule { }