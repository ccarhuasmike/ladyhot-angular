import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { PasarelaPagoService } from 'src/app/shared/services/pasarelapago/pasarelapago.service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';

declare var Stripe: any;
declare var $: any;

@Component({
    selector: 'app-modal-pasarela-pago',
    templateUrl: './pasarela-pago.component.html',
    styleUrls: ['./pasarela-pago.component.css']
})
export class ModalPasarelaPagoComponent {
    foto: string;
    montoPagar: number;
    descripcionCargo: string;
    titulo: string;
    idProducto: number;
    idAnuncio: number;
    mostrarError: boolean;
    bodyProductSeleccionado;
    submitted = false;
    public formPago = null;

    public onClose: Subject<String>;

    //Controles Datos de Contacto
    //txt_numero_tarjetaCtrl: FormControl;
    //txt_expiracionCtrl: FormControl;
    //txt_cvvCtrl: FormControl;
    txt_emailCtrl: FormControl;
    //Registro de Expresiones
    RegEx_mailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    constructor(
        private pasaPagoService: PasarelaPagoService,
        private _bsModalRef: BsModalRef) {
    }

    ngOnInit() {
        this.onClose = new Subject();
        // Llave publica Stripe
        const stripe = Stripe(environment.stripeKey);

        this.txt_emailCtrl = new FormControl('', [
            Validators.required,
            this.customPatternValid({ pattern: this.RegEx_mailPattern, msg: 'Formato no correcto' })
        ]);

        this.formPago = new FormGroup({
            txt_email: this.txt_emailCtrl
        });
        this.mostrarError = false;
        this.foto = this["data"]["foto"];
        this.montoPagar = this["data"]["montoPagar"];
        this.descripcionCargo = this["data"]["descripcionCargo"];
        this.bodyProductSeleccionado = JSON.parse(this["data"]["bodyProductSeleccionado"]);
        this.titulo = this["data"]["titulo"];
        this.idProducto = this["data"]["idProducto"];
        this.idAnuncio = this["data"]["idAnuncio"];

        // Crea element parte de la tarjeta que busca actualizaciones y muestra mensajes de error
        const elementos = stripe.elements();
        const tarjeta = elementos.create('cardNumber', {
            classes: {
                base: "form-control",
                invalid: "is-invalid"
            },
            placeholder: "Número de Tarjeta"
        });
        tarjeta.mount('#elemento-tarjeta');
        tarjeta.addEventListener('change', event => {
            const contenedorError = document.getElementById('errores-tarjeta');
            if (event.error) {
                this.mostrarError = true;
                contenedorError.textContent = event.error.message;
            } else {
                contenedorError.textContent = '';
                this.mostrarError = false;
            }
        });

        const expiracionTarjeta = elementos.create('cardExpiry', {
            classes: {
                base: "form-control",
                invalid: "is-invalid"
            },
            placeholder: "Mes / Año"
        });
        expiracionTarjeta.mount('#expiracion-tarjeta');
        expiracionTarjeta.addEventListener('change', event => {
            const contenedorError = document.getElementById('errores-tarjeta');
            if (event.error) {
                this.mostrarError = true;
                contenedorError.textContent = event.error.message;
            } else {
                contenedorError.textContent = '';
                this.mostrarError = false;
            }
        });

        const cvcTarjeta = elementos.create('cardCvc', {
            classes: {
                base: "form-control",
                invalid: "is-invalid"
            },
            placeholder: "CVC"
        });

        cvcTarjeta.mount('#cvc-tarjeta');
        cvcTarjeta.addEventListener('change', event => {
            const contenedorError = document.getElementById('errores-tarjeta');
            if (event.error) {
                this.mostrarError = true;
                contenedorError.textContent = event.error.message;
            } else {
                contenedorError.textContent = '';
                this.mostrarError = false;
            }
        });

        // Escucha el envio y procesa el formulario con Stripe,
        const formPago = document.getElementById('form_pago');
        formPago.addEventListener('submit', event => {
            event.preventDefault();
            this.submitted = true;
            /*if (this.formPago.invalid) {
                return;
            }*/

            stripe.createToken(tarjeta, expiracionTarjeta, cvcTarjeta).then(result => {

                if (result.error) {
                    const contenedorError = document.getElementById('errores-tarjeta');
                    contenedorError.textContent = result.error.message;
                    this.mostrarError = true;
                } else {
                    if (this.formPago.invalid)
                        return;

                    $("#payment-button-sending").show();
                    $("#payment-button-amount").hide();
                    this.mostrarError = false;
                    // Envia el token de identificacion para adjuntar la fuente de pago al cliente
                    let infoCargo = {
                        stripeToken: result.token.id,
                        correo: formPago["correo"].value,
                        nombreCompleto: '',
                        telefonoCelular: '',
                        descripcionCargo: this.descripcionCargo,
                        idAnuncio: this.bodyProductSeleccionado.idAnuncio,//cambiar el 1 por codigo de anucio real
                        idProducto: this.bodyProductSeleccionado.idProducto,
                        primerDiaSubida: this.bodyProductSeleccionado.primerDiaSubida == undefined ? null : this.bodyProductSeleccionado.primerDiaSubida,
                        ultimoDiaSubida: this.bodyProductSeleccionado.ultimoDiaSubida == undefined ? null : this.bodyProductSeleccionado.ultimoDiaSubida,
                        primerHoraSubida: this.bodyProductSeleccionado.primerHoraSubida == undefined ? "" : this.bodyProductSeleccionado.primerHoraSubida,
                        ultimoHoraSubida: this.bodyProductSeleccionado.ultimoHoraSubida == undefined ? "" : this.bodyProductSeleccionado.ultimoHoraSubida
                    }
                    this.pasaPagoService.CrearCargo(infoCargo).subscribe(
                        (res) => {
                            $("#payment-button-sending").hide();
                            $("#payment-button-amount").show();

                            tarjeta.clear();
                            expiracionTarjeta.clear();
                            cvcTarjeta.clear();
                            this.onReset();
                            this.onConfirm(JSON.parse(res["Data"])["mensajePago"]);
                        }
                    );
                }
            });
        });
    }

    /*Limpiar los controles del formulario*/
    onReset() {
        this.submitted = false;
        this.formPago.reset();
    }

    /*Accede facilmente a los campos de formulario*/
    get f() { return this.formPago.controls; }

    /*
    Metodo que validar patron regular y retorna mensaje validacion
    @param:regex
    @param:mensaje
    */
    public customPatternValid(config: any): ValidatorFn {
        return (control: FormControl) => {
            let urlRegEx: RegExp = config.pattern;
            if (control.value && !control.value.match(urlRegEx)) {
                return {
                    invalidMsg: config.msg
                };
            } else {
                return null;
            }
        };
    }

    public onConfirm(mensaje: String): void {
        this.onClose.next(mensaje);
        this._bsModalRef.hide();
    }
}