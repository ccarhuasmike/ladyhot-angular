import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderShared } from "../../view/shared/header/header.component"
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [HeaderShared],
    exports: [HeaderShared]
})
export class SharedCompoentModule { }
