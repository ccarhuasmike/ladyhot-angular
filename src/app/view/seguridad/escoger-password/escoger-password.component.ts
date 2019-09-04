import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-escoger-password',
    templateUrl: "./escoger-password.component.html",
    styleUrls: ['../css/global.component.css']
})
export class EscogerPasswordComponent implements OnInit {
    public token;
    formEscogerPassword: FormGroup;
    txt_passwordnuevoCtrl: FormControl;
    txt_passwordconfirmarCtrl: FormControl;
    isSubmitted: boolean = false;
    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        //http://localhost:4200/seguridad/EscogerPassword/C107A5F9-6B3F-4158-B928-4EDFCC422B90
        this.token = this.route.snapshot.params['token'];
        this.cargarControles();
        console.log(this.token);
    }
    cargarControles() {
        //Controles Datos para contactar
        this.txt_passwordnuevoCtrl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]);
        this.txt_passwordconfirmarCtrl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]);

        this.formEscogerPassword = new FormGroup({
            txt_passwordnuevo: this.txt_passwordnuevoCtrl,
            txt_passwordconfirmar: this.txt_passwordconfirmarCtrl
        }, this.pwdMatchValidator);

    }
    pwdMatchValidator(frm: FormGroup) {        
        var result=frm.get('txt_passwordnuevo').value === frm.get('txt_passwordconfirmar').value ? null : { 'mismatch': true };
        return result;
    }
    ClickEscogerPassword() {
        this.isSubmitted = true;
        debugger;
        if (!this.formEscogerPassword.valid)
            return;
        let entidad: any = {};
        // entidad.tx_email = this.formLogin.value.txt_email;
        // entidad.tx_pass = this.formLogin.value.txt_password;
        // // entidad.tx_email = this.encriptar('123456$#@$^@1ERF', this.formIngresar.value.txt_email);
        // // entidad.tx_pass = this.encriptar('123456$#@$^@1ERF', this.formIngresar.value.txt_password);
        // this.usuarioService.IniciarSession(entidad).subscribe(
        //     (res) => {
        //         if (res.Status == "OK") {
        //             if (res.Data != null) {
        //                 localStorage.setItem('DataUsuarioLogeado', JSON.stringify(res.Data));
        //                 this.router.navigate(['panelcontrol/misanuncios']);
        //             } else {
        //                 console.log("usuario y/o contraseña incorrecto");
        //             }
        //         } else {
        //             console.log("ejecute Error");
        //         }
        //     }
        // );
    }
    
}