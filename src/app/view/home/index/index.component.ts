import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClientResponse } from '../../../Models/ClientResponseModels';
import { NgxMasonryOptions } from 'ngx-masonry';
import { HomeService } from "../../../shared/services/anuncio/home.services";
import { ModalDetalleAnuncio } from '../modalDetalleAnuncio/modalDetalleAnuncio.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SeoService } from 'src/app/shared/services/seo/seo.service';
import { ParameterService } from "../../../shared/services/anuncio/parameter.service";
import { FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: "./index.component.html",
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  modalRef: BsModalRef;
  schema: {};
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '2.0s',
    gutter: 5
  };
  list: any;
  public title = 'autobot';
  public status: boolean = false;
  masonryImages: any;
  EntidadFiltro: any = {};
  limit = 16;

  /*Variables de Filtros */
  fromGenerales: FormGroup;
  ListDistrito: any = [];
  ListLugarAtencion: any = [];
  ListTipoServicio: any = [];
  listParameter: any;
  //Controles Servicios
  controlsDist: any;
  controlsLugar: any;
  controlsTipServ: any;
  entidad: any = {};
  txt_nombre_fichaCtrl: FormControl;

  constructor(
    private homeService: HomeService,
    private modalService: BsModalService,
    private seoService: SeoService,
    private parameter: ParameterService,
  ) {
  }

  cargarControlFiltros() {
    this.parameter.getParameterFilterHome().subscribe(
      (res: ClientResponse) => {
        this.listParameter = JSON.parse(res.DataJson); // aqui se obtiene los paramter de la base de datos  
        this.ListDistrito = this.listParameter.distritro;
        this.ListLugarAtencion = this.listParameter.lugaratencion;
        this.ListTipoServicio = this.listParameter.servicio_ofrece;
        this.controlsDist = this.ListDistrito.map(c => new FormControl(false));
        this.controlsLugar = this.ListLugarAtencion.map(c => new FormControl(false));
        this.controlsTipServ = this.ListTipoServicio.map(c => new FormControl(false));
        this.txt_nombre_fichaCtrl = new FormControl('');
        this.fromGenerales = new FormGroup({
          ListDistrito: new FormArray(this.controlsDist),
          ListLugarAtencion: new FormArray(this.controlsLugar),
          ListTipoServicio: new FormArray(this.controlsTipServ),
          txt_nombre_ficha: this.txt_nombre_fichaCtrl
        });
      }
    );
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
  getCheboxerSeleccionado(ListSeleccionado: any): string {
    let selecionado: string = "";
    for (let index = 0; index < ListSeleccionado.length; index++) {
      selecionado += ListSeleccionado[index] + ",";
    }
    selecionado = selecionado.substring(0, selecionado.length - 1);
    return selecionado;
  }
  Limpiar() {
    //Implementar logica limpiar controles 
    this.fromGenerales.reset({
      txt_nombre_ficha: ''
    });
    this.ListDistrito.forEach(element => {
      element.flag = false;
    });
    this.ListLugarAtencion.forEach(element => {
      element.flag = false;
    });
    this.ListTipoServicio.forEach(element => {
      element.flag = false;
    });
  }
  FiltrarDatos(event): void {
    const selectedDistrito = this.fromGenerales.value.ListDistrito
      .map((v, i) => v ? this.ListDistrito[i].val_valor : null)
      .filter(v => v !== null);
    const selectedLugarAtencion = this.fromGenerales.value.ListLugarAtencion
      .map((v, i) => v ? this.ListLugarAtencion[i].val_valor : null)
      .filter(v => v !== null);
    const selectedTipoServicio = this.fromGenerales.value.ListTipoServicio
      .map((v, i) => v ? this.ListTipoServicio[i].val_valor : null)
      .filter(v => v !== null);
    this.entidad.txt_nombre_ficha = this.fromGenerales.value.txt_nombre_ficha;
    this.entidad.txt_lugar_servicio_distrito = this.getCheboxerSeleccionado(selectedDistrito);
    this.entidad.tx_lugar_atencion = this.getCheboxerSeleccionado(selectedLugarAtencion);
    this.entidad.tx_servicios_ofrece = this.getCheboxerSeleccionado(selectedTipoServicio);
    this.limit = 15;
    this.EntidadFiltro = this.entidad;
    this.getLisAnuncios(true, this.entidad);
  }
  onFilterClick() {
    this.status = !this.status; 
  }
  onCloseClick() {
    this.status = !this.status; 
    //cdClose();
  }


  onScrollDown() {
    this.limit += 15;
    this.masonryImages = this.list.slice(0, this.limit);
  }
  onScrollUp() {
  }
  getLisAnuncios(filtrer: boolean = false, entidadFiltro: any = {}) {
    if (filtrer) {
      this.masonryImages = this.list.filter(function (e) {
        return e.txt_nombre_ficha.toLowerCase().indexOf(entidadFiltro.txt_nombre_ficha.toLowerCase()) > -1 ||
          e.txt_lugar_servicio_distrito.indexOf(entidadFiltro.txt_lugar_servicio_distrito) ||
          e.tx_servicios_ofrece.indexOf(entidadFiltro.tx_servicios_ofrece) ||
          e.tx_lugar_atencion.indexOf(entidadFiltro.tx_lugar_atencion)
      }).slice(0, this.limit);
      this.schema = this.seoService.generarJsonSchemaMovie(this.masonryImages.slice(0, 10));
    } else {
      this.homeService.getAnuncio().subscribe(
        (res: ClientResponse) => {

          this.list = JSON.parse(res.DataJson);
          this.masonryImages = this.list.slice(0, this.limit);
          this.schema = this.seoService.generarJsonSchemaMovie(this.masonryImages.slice(0, 10));
        },
        (error) => {
          console.log(error + "getLisAnuncios");
        }
      );
    }
  }
  ngOnInit() {
    this.cargarControlFiltros();
    this.getLisAnuncios();
  }
  ngAfterContentInit() {
    if (sessionStorage.getItem("idAnuncio") != null) {
      let id = parseInt(sessionStorage.getItem("idAnuncio"));
      sessionStorage.removeItem("idAnuncio");
      this.openModalDetalleAnuncio(id);
    }
  }
  openModalDetalleAnuncio(id: number) {
    this.modalRef = this.modalService.show(ModalDetalleAnuncio, {
      animated: true,
      //backdrop: 'static',
      class: 'modal-lg',
      initialState: {
        title: 'Actualizar Anuncio Demo',
        data: {
          id: id
        }
      }
    });
  }
}