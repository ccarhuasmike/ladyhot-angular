import { Component, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions, Element as StripeElement, Elements } from "ngx-stripe";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasarelaPagoService } from 'src/app/shared/services/pasarela-pago/pasarela-pago';
/*declare var stripe: any;
declare var elements: any;*/
@Component({
    selector: 'app-pasarela-pago',
    templateUrl: './pasarela-pago.component.html',
    styleUrls: ['./pasarela-pago.component.css']
})
export class PasarelaPagoComponent {

    @ViewChild(StripeCardComponent) card: StripeCardComponent;
    elements: Elements;
    cards: StripeElement;

    constructor(
        //private fb: FormBuilder,
        private pasaPagoService: PasarelaPagoService,
        private stripeService: StripeService) { }

    public paymentForm = new FormGroup({
        cardName: new FormControl("", Validators.required),
        email: new FormControl("", Validators.required),
        phone: new FormControl("", Validators.required)

    });

    /*ngOnInit() {
        this.stripeTest = this.fb.group({
            name: ['', [Validators.required]]
        });
        this.stripeService.elements(this.elementsOptions)
            .subscribe(elements => {
                this.elements = elements;
                // Only mount the element the first time
                if (!this.card) {
                    this.cards = this.elements.create('cardNumber', {
                        /*classes: {
                            base: "form-control",
                            invalid: "error"
                        }
                        
                    });
                    //this.card.mount('#card-element');
                }
            });
    }*/

    cardOptions: ElementOptions = {
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

    /*cards = this.elements.create('card', {
        style: {
            base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                    color: '#CFD7E0'
                }
            }
        }
    });*/

    //other optional options
    elementsOptions: ElementsOptions = {
        locale: 'es'
    };


    /*ngAfterViewInit() {
        this.card = elements.create('card');
      }*/
    /*
    // Create a Stripe client.
    declare stripe = Stripe('pk_test_SVVqZc4cQMPx8dXubJbMPon000bs0VtVZN');
    
    // Create an instance of Elements.
    var elements = stripe.elements();
    
    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    };
    
    // Create an instance of the card Element.
    var card = elements.create('cardNumber', {
        classes: {
            base: "form-control",
            invalid: "error"
        }
    });
    
    var cvc = elements.create('cardCvc', {
        classes: {
            base: "form-control",
            invalid: "error"
        }
    });
    
    var exp = elements.create('cardExpiry', {
        classes: {
            base: "form-control",
            invalid: "error"
        }
    });
    
    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-number');
    cvc.mount('#card-cvc');
    exp.mount('#card-exp');
    
    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function (event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });
    
    // Handle form submission.
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
    
        stripe.createToken(card).then(function (result) {
            if (result.error) {
                // Inform the user if there was an error.
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // Send the token to your server.
                stripeTokenHandler(result.token);
            }
        });
    });
    
    // Submit the form with the token ID.
    function stripeTokenHandler(token) {
        // Insert the token ID into the form so it gets submitted to the server
        var form = document.getElementById('payment-form');
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);
    
        // Submit the form
        form.submit();
    }*/

    comprar(formdata: FormData) {
        debugger;
        this.stripeService.createToken(this.card.getCard(), { name })
            .subscribe(result => {

                if (result.token) {
                    /*const headers = new HttpHeaders()
                        .set('Content-Type', 'application/json');*/


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
                            /*if (res.Status == "OK") {
                                let DataJsonAnuncio: any = res.Data;
                                localStorage.setItem('DataAnuncio', DataJsonAnuncio);
                                this.router.navigate(['panelcontrol/misanuncios']);
                            } else {
                                console.log("ejecute Error");
                            }*/
                        }
                    );

                    //make a call to the server
                    /*this.httpclient.post("http://localhost:8000/charge",
                        JSON.stringify(obj),
                        { headers: headers }).subscribe(data => {
                            console.log("---- Transaction Data -----");
                            //message from the API
                            console.log(data);
                        });*/


                    console.log(result.token.id);
                } else if (result.error) {
                    console.log(result.error.message);
                }

            });
    }
}