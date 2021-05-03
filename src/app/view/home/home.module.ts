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
        ReusableModule
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