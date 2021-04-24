import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SeguridadService } from 'src/app/shared/services/seguridad/seguridad.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-restablecer-password',
    templateUrl: "./restablecer-password.component.html",
    //styleUrls: ['../css/global.component.css']
})
export class RestablecerPasswordComponent implements OnInit {
    formGenerarPassword: FormGroup;
    isSubmitted: boolean = false;
    txt_emailGenerarPasswordCtrl: FormControl;
    constructor(
        private seguridadService: SeguridadService,
        private router: Router,
    ) { }

    ngOnInit() {
        
        this.txt_emailGenerarPasswordCtrl = new FormControl('', [Validators.required]);    
        this.formGenerarPassword = new FormGroup({
            txt_emailGenerarPassword: this.txt_emailGenerarPasswordCtrl            
        });
    }
    GenerarPassword() {
        this.isSubmitted = true;
        if (!this.formGenerarPassword.valid)
            return;
        let entidad: any = {};
        entidad.para = new Array(this.formGenerarPassword.value.txt_emailGenerarPassword);          
        this.seguridadService.ReestablecerContrasnia(entidad).subscribe(
            (res) => {
                if (res.Status == "OK") {                
                     this.router.navigate(['seguridad/SendEmailPassword']);
                } else {
                    console.log("ejecute Error");
                }
            }
        );      
    }
}