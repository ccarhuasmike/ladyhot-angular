import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ingresar',
    templateUrl: "./ingresar.component.html",
    styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {
    formIngresar: FormGroup;
    isSubmitted: boolean = false;

    //Controles Datos de Contacto
    txt_emailCtrl: FormControl;
    txt_passwordCtrl: FormControl;

    constructor(
        private usuarioService: UsuarioService,
        private router: Router
    ) { }

    ngOnInit() {
        this.cargarControles();
    }

    cargarControles() {
        //Controles Datos para contactar
        this.txt_emailCtrl = new FormControl('', [Validators.required]);
        this.txt_passwordCtrl = new FormControl('', [Validators.required]);

        this.formIngresar = new FormGroup({
            txt_email: this.txt_emailCtrl,
            txt_password: this.txt_passwordCtrl,

        });
    }

    ingresar() {
        this.isSubmitted = true;
        if (!this.formIngresar.valid)
            return;
        let entidad: any = {};
        entidad.tx_email = this.formIngresar.value.txt_email;
        entidad.tx_pass = this.formIngresar.value.txt_password;
        this.usuarioService.IniciarSession(entidad).subscribe(
            (res) => {
                console.log(res);
                if (res.result.Status == "OK") {
                    this.router.navigate(['panelcontrol/misanuncios']);
                    console.log(JSON.parse(res.result.DataJson));
                    alert("inicio session");
                } else {
                    console.log("ejecute Error");
                }
            }
        );
    }
}