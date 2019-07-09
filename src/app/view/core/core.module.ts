import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
            CommonModule, 
            RouterModule, 
            BrowserAnimationsModule, 
            FormsModule, 
            ReactiveFormsModule, 
            FormsModule],
    declarations: [ HeaderComponent, MainComponent, FooterComponent],
    exports: [MainComponent]
})
export class CoreModule { }
