import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboadAnuncioRoutingModule } from './dashboardanucion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreAnuncioComponent } from './core/core.component';
import { ContactarComponent } from './contactar/contactar.component';
@NgModule({
    imports: [
        CommonModule,
        DashboadAnuncioRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        CoreAnuncioComponent,
        ContactarComponent
    ],
    exports: [
    ]
})
export class DashboadAnuncioModule { }
