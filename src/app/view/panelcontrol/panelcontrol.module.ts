import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelControlRoutingModule } from './panelcontrol-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/indexcomponent';
import { ContactarComponent } from './contactar/contactar.component';
@NgModule({
    imports: [
        CommonModule,
        PanelControlRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        IndexComponent,
        ContactarComponent
    ],
    exports: [
    ]
})
export class PanelControlModule { }
