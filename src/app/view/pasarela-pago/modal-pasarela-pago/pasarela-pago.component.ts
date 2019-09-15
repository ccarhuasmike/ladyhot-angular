import { Component, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions, Element as StripeElement, Elements } from "ngx-stripe";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasarelaPagoService } from 'src/app/shared/services/pasarela-pago/pasarela-pago';

@Component({
    selector: 'app-modal-pasarela-pago',
    templateUrl: './pasarela-pago.component.html',
    styleUrls: ['./pasarela-pago.component.css']
})
export class ModalPasarelaPagoComponent {

    constructor(
        private pasaPagoService: PasarelaPagoService,
        private stripeService: StripeService) { }

    @ViewChild(StripeCardComponent) tarjeta: StripeCardComponent;
    elements: Elements;

    public formPago = new FormGroup({
        cardName: new FormControl("", Validators.required),
        email: new FormControl("", Validators.required),
        phone: new FormControl("", Validators.required)

    });

    tarjetaOpciones: ElementOptions = {
        style: {
            base: {
                iconColor: '#32325d',
                color: '#32325d',
                fontSize: "16px",
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        }
    }

    //other optional options
    elementosOptions: ElementsOptions = {
        locale: 'es'
    };

    /*card = this.elements.create('cardNumber',{
        classes:{
            
        }
    });*/

    comprar(formdata: FormData) {
        this.stripeService.createToken(this.tarjeta.getCard(), { name })
            .subscribe(result => {

                if (result.token) {
                    let obj = {
                        stripeToken: result.token.id,
                        email: formdata["email"],
                        cardName: formdata["cardName"],
                        phone: formdata["phone"]
                        //amount: this.price,
                        //product: this.product,
                        //description: this.description

                    }

                    this.pasaPagoService.CrearCargo(obj).subscribe(
                        (res) => {
                            console.log(res);
                        }
                    );
                    console.log(result.token.id);
                } else if (result.error) {
                    console.log(result.error.message);
                }

            });
    }
}