import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderShared } from "../../view/shared/header/header.component"
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [HeaderShared],
    exports: [HeaderShared]
})
export class SharedCompoentModule { }
