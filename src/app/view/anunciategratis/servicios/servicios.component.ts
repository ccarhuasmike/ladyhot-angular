import { Component, OnInit } from '@angular/core';
import { AnuncioService } from "../../../shared/services/anuncio/anuncio.service";
import { UbigeoService } from "../../../shared/services/ubigeo/ubigeo.service";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-servicios',
    templateUrl: './servicios.component.html',
    //styleUrls: ['../css/global.component.css'],
})
export class ServiciosComponent implements OnInit {

    result: any = null;

    ListDepartamento: any = [];
    ListProvincia: any = [];
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

    txt_DondeQuieresAnunciarteCtrl: FormControl;
    departamentoCtrl: FormControl;
    provinciaCtrl: FormControl;

    fromServicios: FormGroup;
    //servicios: Servicios;
    DataJsonAnuncio: any;
    controldistritos = new FormArray([]);
    constructor(
        private anuncioService: AnuncioService,
        private ubigeoService: UbigeoService,
        private router: Router,
        private frmBuilder: FormBuilder,
        private spinner: NgxSpinnerService
    ) { }

    onChangeProvincia(IdProv) {
        if (IdProv != '') {
            this.ubigeoService.getDistrito(parseInt(IdProv)).subscribe(
                (res) => {     
                    this.limpiarControlesDistrito();
                    this.ListDistrito = res;
                    this.ListDistrito.forEach(element => {
                        element.flag = false; 
                        /*Agregamos control checkbox */
                        var control = new FormControl(false, Validators.required);
                        this.controldistritos.push(control);
                    });            
                    var controlArray = this.fromServicios.controls.ListDistrito as FormArray;
                    this.controlsDist = controlArray.controls;
                    controlArray.setValidators(this.minSelectedCheckboxes(1));
                }
            );
        } else {
            this.limpiarControlesDistrito();
        }

    }

    limpiarControlesDistrito(){
        /*Limpiar el contrl de distrito */
        this.ListDistrito = [];
        var controlArray = this.fromServicios.controls.ListDistrito as FormArray;
        controlArray.controls = [];
    }

    onChangeDertamento(IdDep) {
        if (IdDep != '') {
            this.ubigeoService.getProvincia(parseInt(IdDep)).subscribe(
                (res) => {
                    this.limpiarControlesProvincia();
                    this.ListProvincia = res;
                }
            );
        } else {
            this.limpiarControlesProvincia();
        }

    }

    limpiarControlesProvincia(){
        /*Limpiar el contrl de provincia */
        this.ListProvincia = [];
        this.ListDistrito = [];
        var controlArray = this.fromServicios.controls.ListDistrito as FormArray;
        controlArray.controls = [];
    }

    getDepartamento() {
        this.ubigeoService.getDepartamento().subscribe(
            (res) => {
                this.ListDepartamento = res;
            }
        );
    }
    ngOnInit() {
        this.getDepartamento();
        this.DataJsonAnuncio = JSON.parse(localStorage.getItem('DataAnuncio'));
        this.ListProvincia = JSON.parse(localStorage.getItem('DataProvincia'));
        let listaParamter = JSON.parse(localStorage.getItem('listParamter'));
        this.anuncioService.segundopaso(true);
        this.anuncioService.tercerpaso(true);
        this.anuncioService.cuartopaso(true);
        this.anuncioService.quintopaso(true);
        this.anuncioService.sextopaso(false);

        //this.ListDistrito = listaParamter.distritro;//this.anuncioService.getListDistrito();
        this.ListLugarAtencion = listaParamter.lugaratencion;// this.anuncioService.getListLugarAtencion();
        this.ListTipoServicio = listaParamter.servicio_ofrece;//this.anuncioService.getListTipoServicio();//listaParamter.servicio_ofrece;
       
        this.controlsDist = this.ListDistrito.map(c => new FormControl(false));
        this.controlsLugar = this.ListLugarAtencion.map(c => new FormControl(false));
        this.controlsTipServ = this.ListTipoServicio.map(c => new FormControl(false));
        this.flagatiende24horasCtrl = new FormControl('', []);
        this.txtalgosobredispCtrl = new FormControl('', [Validators.maxLength(450)]);
        this.txt_descripcion_serviciosCtrl = new FormControl('', [Validators.maxLength(450)]);
        this.txt_DondeQuieresAnunciarteCtrl = new FormControl('', [Validators.maxLength(80)]);
        this.departamentoCtrl = new FormControl('', [Validators.required]);
        this.provinciaCtrl = new FormControl('', [Validators.required]);
       
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
        // var s = new FormArray(this.controlsDist, this.minSelectedCheckboxes(1));
        // var d = new FormArray(this.controlsDist);
        this.fromServicios = this.frmBuilder.group({            
            ListDistrito: this.controldistritos,
            ListLugarAtencion: new FormArray(this.controlsLugar, this.minSelectedCheckboxes(1)),
            ListTipoServicio: new FormArray(this.controlsTipServ, this.minSelectedCheckboxes(1)),
            flagatiende24hora: this.flagatiende24horasCtrl,
            algosobredisponibilidad: this.txtalgosobredispCtrl,
            txt_descripcion_servicios: this.txt_descripcion_serviciosCtrl,
            departamento: this.departamentoCtrl,
            provincia: this.provinciaCtrl,
        });

        if (this.DataJsonAnuncio !== null) {            
            this.ListDistrito = JSON.parse(localStorage.getItem('DataDistrito'));
            if(this.ListDistrito != null){
                this.ListDistrito.forEach(element => {
                    element.flag = false; 
                    /*Agregamos control checkbox */
                    var control = new FormControl(false, Validators.required);
                    this.controldistritos.push(control);
                });    
            }           
            var controlArray = this.fromServicios.controls.ListDistrito as FormArray;
            this.controlsDist = controlArray.controls;
            controlArray.setValidators(this.minSelectedCheckboxes(1));
            //Validamos el seteo del distrito
            if (this.DataJsonAnuncio.txt_lugar_servicio_distrito != null && this.DataJsonAnuncio.txt_lugar_servicio_distrito != "") {
                this.setCheboxesDistrito(this.ListDistrito, this.DataJsonAnuncio.txt_lugar_servicio_distrito, this.controlsDist);
            }
            this.fromServicios.patchValue({                
                algosobredisponibilidad: this.DataJsonAnuncio.tx_descripcion_extra_horario,
                txt_descripcion_servicios: this.DataJsonAnuncio.tx_descripcion_extra_servicio,
                departamento: this.DataJsonAnuncio.int_departamento == 0 ? "" : this.DataJsonAnuncio.int_departamento,//this.DataJsonAnuncio.int_departamento,
                provincia: this.DataJsonAnuncio.int_provincia == 0 ? "" : this.DataJsonAnuncio.int_provincia //this.DataJsonAnuncio.int_provincia,
            });
        }
    }
    
    setCheboxesDistrito(listCargados: any, listSeleccionado: string, controls: any) {
        let arraSeleccionado: any[] = listSeleccionado.split(",");
        for (let index = 0; index < arraSeleccionado.length; index++) {
            for (let index1 = 0; index1 < listCargados.length; index1++) {
                if (arraSeleccionado[index] == listCargados[index1].IdDist) {
                    listCargados[index1].flag = true;
                    controls[index1].setValue(true);
                }
            }
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
       
        let index = this.ListDistrito.findIndex(x => x.IdDist === val_valor);
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
        this.spinner.show();
       
        const selectedDistrito = this.fromServicios.value.ListDistrito
            .map((v, i) => v ? this.ListDistrito[i].IdDist : null)
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

        this.DataJsonAnuncio.tx_descripcion_extra_horario = this.fromServicios.value.algosobredisponibilidad;
        this.DataJsonAnuncio.tx_descripcion_extra_horario = this.fromServicios.value.algosobredisponibilidad;

        this.DataJsonAnuncio.int_departamento = this.fromServicios.value.departamento;
        this.DataJsonAnuncio.int_provincia = this.fromServicios.value.provincia;


        this.anuncioService.SaveQuintoPaso(this.DataJsonAnuncio).subscribe(
            (res) => {
                if (res.Status == "OK") {
                    let DataJsonAnuncio: any = res.Data;
                    localStorage.setItem('DataAnuncio', DataJsonAnuncio);
                    localStorage.setItem('DataProvincia', JSON.stringify(JSON.parse(res.DataJson).provincia));
                    localStorage.setItem('DataDistrito', JSON.stringify(JSON.parse(res.DataJson).distrito));
                    this.router.navigate(['anunciategratis/galeria']);
                }
                setTimeout(() => {
                    this.spinner.hide();
                }, 2000);
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
        this.router.navigate(['anunciategratis/tarifa']);
    }

}
