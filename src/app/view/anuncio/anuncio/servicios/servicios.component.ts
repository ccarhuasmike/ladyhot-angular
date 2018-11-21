import { Component, OnInit } from '@angular/core';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './servicios.component.html',
    styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

    result: any = null;

    ListDistrito: any = [];
    ListLugarAtencion: any = [];
    ListTipoServicio: any = [];

    isSubmittedTarifas: boolean = false;

    controlsDist: any;
    controlsLugar: any;
    controlsTipServ: any;

    fromServicios: FormGroup;


    constructor(
        private anuncioService: AnuncioService,
        private router: Router,
        private frmBuilder: FormBuilder

    ) { }

    ngOnInit() {

        this.anuncioService.segundopaso(true);
        this.anuncioService.tercerpaso(true);
        this.anuncioService.cuartopaso(true);
        this.anuncioService.quintopaso(true);

        this.ListDistrito = this.anuncioService.getListDistrito();
        this.ListLugarAtencion = this.anuncioService.getListLugarAtencion();
        this.ListTipoServicio = this.anuncioService.getListTipoServicio();


        this.controlsDist = this.ListDistrito.map(c => new FormControl(false));
        this.controlsDist[0].setValue(true);
        this.ListDistrito[0].flag = true;

        this.controlsLugar = this.ListLugarAtencion.map(c => new FormControl(false));
        this.controlsLugar[0].setValue(true);
        this.ListLugarAtencion[0].flag = true;

        this.controlsTipServ = this.ListTipoServicio.map(c => new FormControl(false));
        this.controlsTipServ[0].setValue(true);
        this.ListTipoServicio[0].flag = true;

        this.fromServicios = this.frmBuilder.group({
            ListDistrito: new FormArray(this.controlsDist, this.minSelectedCheckboxes(1)),
            ListLugarAtencion: new FormArray(this.controlsLugar, this.minSelectedCheckboxes(1)),
            ListTipoServicio: new FormArray(this.controlsTipServ, this.minSelectedCheckboxes(1))
        });

    }

    minSelectedCheckboxes(min = 1) {
        const validator: ValidatorFn = (formArray: FormArray) => {
            const totalSelected = formArray.controls
                .map(control => control.value)
                .reduce((prev, next) => next ? prev + next : prev, 0);

            return totalSelected >= min ? null : { required: true };
        };
        return validator;
    }

    onChangeDistrito(codigo: number, isChecked: boolean) {

        let index = this.ListDistrito.findIndex(x => x.codigo === codigo);
        if (isChecked) {
            this.ListDistrito[index].flag = isChecked;
        } else {
            this.ListDistrito[index].flag = isChecked;
        }
    }

    onChangeLugarAtencion(codigo: number, isChecked: boolean) {

        let index = this.ListLugarAtencion.findIndex(x => x.codigo === codigo);
        if (isChecked) {
            this.ListLugarAtencion[index].flag = isChecked;
        } else {
            this.ListLugarAtencion[index].flag = isChecked;
        }
    }

    onChangeTipoServicio(codigo: number, isChecked: boolean) {

        let index = this.ListTipoServicio.findIndex(x => x.codigo === codigo);
        if (isChecked) {
            this.ListTipoServicio[index].flag = isChecked;
        } else {
            this.ListTipoServicio[index].flag = isChecked;
        }
    }

    saveServicios() {

        this.isSubmittedTarifas = true;
        if (!this.fromServicios.valid)
            return;

        const selectedDistrito = this.fromServicios.value.ListDistrito
            .map((v, i) => v ? this.ListDistrito[i].codigo : null)
            .filter(v => v !== null);

        const selectedLugarAtencion = this.fromServicios.value.ListLugarAtencion
            .map((v, i) => v ? this.ListLugarAtencion[i].codigo : null)
            .filter(v => v !== null);
        const selectedTipoServicio = this.fromServicios.value.ListTipoServicio
            .map((v, i) => v ? this.ListTipoServicio[i].codigo : null)
            .filter(v => v !== null);

        console.log(selectedDistrito);
        console.log(this.fromServicios);
        // userService.Save(this.register.value);
        this.result = this.fromServicios.value;
        setTimeout(() => {
            this.result = null;
            this.resetServicios();
        }, 2000);
    }
    resetServicios() {
        this.isSubmittedTarifas = false;
        this.fromServicios.reset();
    }

    btnAtras(form: any) {
        this.router.navigate(['/anuncio/tarifa']);
    }

}
