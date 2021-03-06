import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboadAnuncioRoutingModule } from './dashboardanucion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { indexComponent } from './index/indexcomponent';
import { ContactarComponent } from './contactar/contactar.component';
@NgModule({
    imports: [
        CommonModule,
        DashboadAnuncioRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        indexComponent,
        ContactarComponent
    ],
    exports: [
    ]
})
export class DashboadAnuncioModule { }
