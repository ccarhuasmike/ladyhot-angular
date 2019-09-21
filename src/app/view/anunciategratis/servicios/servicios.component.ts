import { Component, OnInit } from '@angular/core';
import { AnuncioService } from "../../../shared/services/anuncio/anuncio.service";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector: 'app-servicios',
    templateUrl: './servicios.component.html',
    styleUrls: ['../css/global.component.css'],
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
    //servicios: Servicios;
    DataJsonAnuncio: any;

    constructor(
        private anuncioService: AnuncioService,
        private router: Router,
        private frmBuilder: FormBuilder

    ) { }

    ngOnInit() {
        this.DataJsonAnuncio = JSON.parse(localStorage.getItem('DataAnuncio'));
        let listaParamter = JSON.parse(localStorage.getItem('listParamter'));
        this.anuncioService.segundopaso(true);
        this.anuncioService.tercerpaso(true);
        this.anuncioService.cuartopaso(true);
        this.anuncioService.quintopaso(true);
        this.anuncioService.sextopaso(false);

        this.ListDistrito = listaParamter.distritro;//this.anuncioService.getListDistrito();
        this.ListLugarAtencion = listaParamter.lugaratencion;// this.anuncioService.getListLugarAtencion();
        this.ListTipoServicio = listaParamter.servicio_ofrece;//this.anuncioService.getListTipoServicio();//listaParamter.servicio_ofrece;

        this.controlsDist = this.ListDistrito.map(c => new FormControl(false));
        this.controlsLugar = this.ListLugarAtencion.map(c => new FormControl(false));
        this.controlsTipServ = this.ListTipoServicio.map(c => new FormControl(false));
        this.flagatiende24horasCtrl = new FormControl('', []);
        this.txtalgosobredispCtrl = new FormControl('', [Validators.maxLength(450)]);
        this.txt_descripcion_serviciosCtrl = new FormControl('', [Validators.maxLength(450)]);

        //Validamos el seteo del distrito

        if (this.DataJsonAnuncio.txt_lugar_servicio_distrito != null) {
            this.setCheboxes(this.ListDistrito, this.DataJsonAnuncio.txt_lugar_servicio_distrito, this.controlsDist);
        } else {
            this.controlsDist[0].setValue(true);
            this.ListDistrito[0].flag = true;
        }
        //Validamos el seteo el lugar de atencion
        if (this.DataJsonAnuncio.tx_lugar_atencion != null) {
            this.setCheboxes(this.ListLugarAtencion, this.DataJsonAnuncio.tx_lugar_atencion, this.controlsLugar);
        } else {
            this.controlsLugar[0].setValue(true);
            this.ListLugarAtencion[0].flag = true;
        }
        //Validamos el seteo el tipo del servicios
        if (this.DataJsonAnuncio.tx_servicios_ofrece != null) {
            this.setCheboxes(this.ListTipoServicio, this.DataJsonAnuncio.tx_servicios_ofrece, this.controlsTipServ);
        } else {
            this.controlsTipServ[0].setValue(true);
            this.ListTipoServicio[0].flag = true;
        }
        this.fromServicios = this.frmBuilder.group({
            ListDistrito: new FormArray(this.controlsDist, this.minSelectedCheckboxes(1)),
            ListLugarAtencion: new FormArray(this.controlsLugar, this.minSelectedCheckboxes(1)),
            ListTipoServicio: new FormArray(this.controlsTipServ, this.minSelectedCheckboxes(1)),
            flagatiende24hora: this.flagatiende24horasCtrl,
            algosobredisponibilidad: this.txtalgosobredispCtrl,
            txt_descripcion_servicios: this.txt_descripcion_serviciosCtrl
        });

        if (this.DataJsonAnuncio !== null) {
            this.fromServicios.patchValue({
                algosobredisponibilidad: this.DataJsonAnuncio.tx_descripcion_extra_horario,
                txt_descripcion_servicios: this.DataJsonAnuncio.tx_descripcion_extra_servicio,
            });
        }
    }

    setCheboxes(listCargados: any, listSeleccionado: string, controls: any) {
        let arraSeleccionado: any[] = listSeleccionado.split(",");
        for (let index = 0; index < arraSeleccionado.length; index++) {
            for (let index1 = 0; index1 < listCargados.length; index1++) {
                if (arraSeleccionado[index] == listCargados[index1].val_valor) {
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

    onChangeDistrito(val_valor: number, isChecked: boolean) {

        let index = this.ListDistrito.findIndex(x => x.val_valor === val_valor);
        if (isChecked) {
            this.ListDistrito[index].flag = isChecked;
        } else {
            this.ListDistrito[index].flag = isChecked;
        }
    }

    onChangeLugarAtencion(val_valor: number, isChecked: boolean) {

        let index = this.ListLugarAtencion.findIndex(x => x.val_valor === val_valor);
        if (isChecked) {
            this.ListLugarAtencion[index].flag = isChecked;
        } else {
            this.ListLugarAtencion[index].flag = isChecked;
        }
    }

    onChangeTipoServicio(val_valor: number, isChecked: boolean) {

        let index = this.ListTipoServicio.findIndex(x => x.val_valor === val_valor);
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
            .map((v, i) => v ? this.ListDistrito[i].val_valor : null)
            .filter(v => v !== null);

        const selectedLugarAtencion = this.fromServicios.value.ListLugarAtencion
            .map((v, i) => v ? this.ListLugarAtencion[i].val_valor : null)
            .filter(v => v !== null);
        const selectedTipoServicio = this.fromServicios.value.ListTipoServicio
            .map((v, i) => v ? this.ListTipoServicio[i].val_valor : null)
            .filter(v => v !== null);

        this.DataJsonAnuncio.txt_lugar_servicio_distrito = this.getCheboxerSeleccionado(selectedDistrito);
        //this.DataJsonAnuncio.fl_atencion_24horas = this.getCheboxerSeleccionado(selectedFormapago);
        this.DataJsonAnuncio.tx_descripcion_extra_horario = this.fromServicios.value.algosobredisponibilidad;
        this.DataJsonAnuncio.tx_lugar_atencion = this.getCheboxerSeleccionado(selectedLugarAtencion);
        this.DataJsonAnuncio.tx_servicios_ofrece = this.getCheboxerSeleccionado(selectedTipoServicio);
        this.DataJsonAnuncio.tx_descripcion_extra_servicio = this.fromServicios.value.txt_descripcion_servicios;

        this.anuncioService.SaveQuintoPaso(this.DataJsonAnuncio).subscribe(
            (res) => {
                if (res.Status == "OK") {
                    let DataJsonAnuncio: any = res.Data;
                    localStorage.setItem('DataAnuncio', DataJsonAnuncio);                    
                    this.router.navigate(['anunciategratis/galeria']);
                }
            }
        );
        // userService.Save(this.register.value);
        // this.result = this.fromServicios.value;
        // setTimeout(() => {
        //     this.result = null;
        //     this.resetServicios();
        // }, 2000);
    }
    getCheboxerSeleccionado(ListSeleccionado: any): string {

        let selecionado: string = "";
        for (let index = 0; index < ListSeleccionado.length; index++) {
            selecionado += ListSeleccionado[index] + ",";
        }
        selecionado = selecionado.substring(0, selecionado.length - 1);
        return selecionado;
    }

    resetServicios() {
        this.isSubmittedTarifas = false;
        this.fromServicios.reset();
    }

    btnAtras(form: any) {
        this.router.navigate(['panelcontrol/nuevoanuncio/tarifa']);
    }

}
