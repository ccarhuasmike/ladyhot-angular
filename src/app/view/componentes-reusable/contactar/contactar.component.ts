import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ContactarService } from "src/app/shared/services/anuncio/contactar.service";

@Component({
  selector: "app-contactar",
  templateUrl: "./contactar.component.html",
  styleUrls: ["./contactar.component.css"],
})
export class ContactarComponent implements OnInit {
  formContactar: FormGroup;
  isSubmitted: boolean = false;
  mostrarProgressBar: boolean = false;
  mostrarMessageSuccess: boolean = false;
  mostrarMessageError: boolean = false;
  //Controles Datos de Contacto
  txt_nombreCtrl: FormControl;
  txt_emailCtrl: FormControl;
  txt_asuntoCtrl: FormControl;
  txt_telefonoCtrl: FormControl;
  txt_mensajeCtrl: FormControl;

  //Registro de Expresiones
  RegEx_mailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

  constructor(private contactarService: ContactarService) {}

  ngOnInit() {
    this.cargarControles();
  }

  cargarControles() {
    //Controles Datos para contactar
    this.txt_nombreCtrl = new FormControl("", [Validators.required]);
    this.txt_emailCtrl = new FormControl("", [
      Validators.required,
      Validators.pattern(this.RegEx_mailPattern),
    ]);
    this.txt_asuntoCtrl = new FormControl("", [Validators.required]);
    this.txt_telefonoCtrl = new FormControl("", [Validators.required]);
    this.txt_mensajeCtrl = new FormControl("", [Validators.required]);

    this.formContactar = new FormGroup({
      txt_nombre: this.txt_nombreCtrl,
      txt_email: this.txt_emailCtrl,
      txt_asunto: this.txt_asuntoCtrl,
      txt_telefono: this.txt_telefonoCtrl,
      txt_mensaje: this.txt_mensajeCtrl,
    });
  }

  resetControles() {
    //let control: AbstractControl = null;
    this.formContactar.reset();
    /*this.formContactar.markAsUntouched();
    Object.keys(this.formContactar.controls).forEach((name) => {
      control = this.formContactar.controls[name];
      //control.errors.required = false;
      control.setErrors(null);
    });*/
  }

  contactar() {
    this.isSubmitted = true;
    if (!this.formContactar.valid) return;
    this.mostrarProgressBar = true;
    let entidad: any = {};
    entidad.nombreContactante = this.formContactar.value.txt_nombre;
    //entidad.para = new Array(this.formContactar.value.txt_email);
    entidad.correoEnvia = this.formContactar.value.txt_email;
    entidad.asunto = this.formContactar.value.txt_asunto;
    entidad.telefonoContacto = new Array(this.formContactar.value.txt_telefono);
    entidad.body = this.formContactar.value.txt_mensaje;
    this.contactarService.EnviarMail(entidad).subscribe((res) => {
      console.log(res);
      if (res.Status == "OK") {
        this.formContactar.reset();
        this.mostrarMessageSuccess = true;
        this.mostrarProgressBar = false;
        this.resetControles();
        //this.router.navigate(['DashboardAnuncion/nuevoanuncio/datos-generales']);
      } else {
        this.mostrarMessageError = true;
      }
    });
  }

  cerrarMessageSuccess() {
    this.mostrarMessageSuccess = false;
  }

  cerrarMessageDanger() {
    this.mostrarMessageError = false;
  }
}