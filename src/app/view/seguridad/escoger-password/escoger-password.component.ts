import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SeguridadService } from 'src/app/shared/services/seguridad/seguridad.service';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-escoger-password',
    templateUrl: "./escoger-password.component.html",
    //styleUrls: ['../css/global.component.css']
})

export class EscogerPasswordComponent implements OnInit {
    formEscogerPassword: FormGroup;
    submitted = false;
    IdUsuario = 0;
    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private seguridadService: SeguridadService,
        private usuarioService: UsuarioService,
        private router: Router,
    ) { }

    ngOnInit() {
        //http://localhost:4200/seguridad/EscogerPassword/C107A5F9-6B3F-4158-B928-4EDFCC422B90      
        let entidad: any = {};
        entidad.tx_token = this.route.snapshot.params['token'];
        debugger;
        this.usuarioService.getUsuarioPorToken(entidad).subscribe(
            (res) => {
                if (res.Status == "OK") {
                    if (res.Data != null) {
                        debugger;
                        let DataUsuario: any = res.Data;
                        this.IdUsuario = DataUsuario.id;
                    }
                }
            }
        );

        this.formEscogerPassword = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
            confirmPassword: ['', Validators.required]
        }, {
                validator: this.MustMatch('password', 'confirmPassword')
            });
    }
    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {

            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
    // convenience getter for easy access to form fields
    get f() { return this.formEscogerPassword.controls; }

    ClickEscogerPassword() {
        debugger;
        this.submitted = true;
        // stop here if form is invalid
        if (this.formEscogerPassword.invalid) {
            return;
        }
        console.log(this.formEscogerPassword);
        debugger;
        let entidad: any = {};
        entidad.tx_pass = this.formEscogerPassword.value.password;      
        entidad.id = this.IdUsuario;
        this.seguridadService.ActualizarPasswordUsuario(entidad).subscribe(
            (res) => {
                debugger;
                if (res.Status == "OK") {
                    this.router.navigate(['seguridad/PasswordGuardado']);
                } else {
                    console.log("ejecute Error");
                }
            }
        );        
    }
}