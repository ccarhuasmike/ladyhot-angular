import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './navigator/footer/footer.component';
import { HeaderComponent } from './navigator/header/header.component';
import { MainComponent } from './navigator/main/main.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { PaginationModule } from 'ngx-pagination-bootstrap'
// import { PaginationModule } from 'ngx-bootstrap/pagination'
@NgModule({
    imports: [CommonModule, RouterModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
    declarations: [NavigatorComponent, HeaderComponent, MainComponent, FooterComponent],
    exports: [NavigatorComponent]
})
export class CoreModule { }
