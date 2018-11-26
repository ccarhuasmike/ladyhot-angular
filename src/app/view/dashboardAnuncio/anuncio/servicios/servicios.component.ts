import { Component, OnInit } from '@angular/core';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelCarga, Servicios } from "../../../models/modelanuncio";
@Component({
    selector: 'app-servicios',
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
    flagatiende24horasCtrl: FormControl;
    txtalgosobredispCtrl: FormControl;
    txt_descripcion_serviciosCtrl: FormControl;

    fromServicios: FormGroup;
    servicios: Servicios;


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
        this.anuncioService.sextopaso(false);

        this.ListDistrito = this.anuncioService.getListDistrito();
        this.ListLugarAtencion = this.anuncioService.getListLugarAtencion();
        this.ListTipoServicio = this.anuncioService.getListTipoServicio();


        this.servicios = this.anuncioService.getServicios();

        this.controlsDist = this.ListDistrito.map(c => new FormControl(false));
        this.controlsLugar = this.ListLugarAtencion.map(c => new FormControl(false));
        this.controlsTipServ = this.ListTipoServicio.map(c => new FormControl(false));
        this.flagatiende24horasCtrl = new FormControl('', []);
        this.txtalgosobredispCtrl = new FormControl('', [Validators.maxLength(450)]);
        this.txt_descripcion_serviciosCtrl = new FormControl('', [Validators.maxLength(450)]);
        debugger;
        //Validamos el seteo del distrito
        if (typeof this.servicios.ListDistrito === 'undefined' || this.servicios.ListDistrito === null) {
            this.controlsDist[0].setValue(true);
            this.ListDistrito[0].flag = true;
        } else {
            this.setCheboxes(this.ListDistrito, this.servicios.ListDistrito, this.controlsDist);
        }
        //Validamos el seteo el lugar de atencion
        if (typeof this.servicios.ListLugar === 'undefined' || this.servicios.ListLugar === null) {
            this.controlsLugar[0].setValue(true);
            this.ListLugarAtencion[0].flag = true;
        } else {
            this.setCheboxes(this.ListLugarAtencion, this.servicios.ListLugar, this.controlsLugar);
        }
        //Validamos el seteo el tipo del servicios
        if (typeof this.servicios.ListServicios === 'undefined' || this.servicios.ListServicios === null) {
            this.controlsTipServ[0].setValue(true);
            this.ListTipoServicio[0].flag = true;
        } else {
            this.setCheboxes(this.ListTipoServicio, this.servicios.ListServicios, this.controlsTipServ);
        }

        this.fromServicios = this.frmBuilder.group({
            ListDistrito: new FormArray(this.controlsDist, this.minSelectedCheckboxes(1)),
            ListLugarAtencion: new FormArray(this.controlsLugar, this.minSelectedCheckboxes(1)),
            ListTipoServicio: new FormArray(this.controlsTipServ, this.minSelectedCheckboxes(1)),
            flagatiende24hora: this.flagatiende24horasCtrl,
            algosobredisponibilidad: this.txtalgosobredispCtrl,
            txt_descripcion_servicios: this.txt_descripcion_serviciosCtrl
        });

        this.fromServicios.patchValue({
            algosobredisponibilidad: this.servicios.algosobredisponibilidad,
            txt_descripcion_servicios: this.servicios.txt_descripcion_servicios,
        });

    }

    setCheboxes(listCargados: any, listSeleccionado: ModelCarga[], controls: any) {
        for (let index = 0; index < listSeleccionado.length; index++) {
            for (let index1 = 0; index1 < listCargados.length; index1++) {
                if (listSeleccionado[index].codigo == listCargados[index1].codigo) {
                    listCargados[index1].flag = true;
                    controls[index1].setValue(true);
                }
            }
        }
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

        debugger;
        const selectedDistrito = this.fromServicios.value.ListDistrito
            .map((v, i) => v ? this.ListDistrito[i].codigo : null)
            .filter(v => v !== null);

        const selectedLugarAtencion = this.fromServicios.value.ListLugarAtencion
            .map((v, i) => v ? this.ListLugarAtencion[i].codigo : null)
            .filter(v => v !== null);
        const selectedTipoServicio = this.fromServicios.value.ListTipoServicio
            .map((v, i) => v ? this.ListTipoServicio[i].codigo : null)
            .filter(v => v !== null);


        this.fromServicios.value.ListDistrito = this.getCheboxerSeleccionado(selectedDistrito);
        this.fromServicios.value.ListLugar = this.getCheboxerSeleccionado(selectedLugarAtencion);
        this.fromServicios.value.ListServicios = this.getCheboxerSeleccionado(selectedTipoServicio);
        this.anuncioService.setServicios(this.fromServicios.value)
        this.router.navigate(['DashboardAnuncion/nuevoanuncio/galeria']);
        // userService.Save(this.register.value);
        // this.result = this.fromServicios.value;
        // setTimeout(() => {
        //     this.result = null;
        //     this.resetServicios();
        // }, 2000);
    }
    getCheboxerSeleccionado(ListSeleccionado: any): ModelCarga[] {
        const ListModelCarga = new Array<ModelCarga>();
        for (let index = 0; index < ListSeleccionado.length; index++) {
            const codigo = ListSeleccionado[index];
            ListModelCarga.push({
                codigo: codigo,
                descripcion: '',
                flag: false
            });
        }
        return ListModelCarga;
    }
    resetServicios() {
        this.isSubmittedTarifas = false;
        this.fromServicios.reset();
    }

    btnAtras(form: any) {
        this.router.navigate(['DashboardAnuncion/nuevoanuncio/tarifa']);
    }

}
