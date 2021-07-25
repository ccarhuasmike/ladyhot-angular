import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { FormGroup, FormControl, FormArray, ValidatorFn } from "@angular/forms";
import { ParameterService } from "../../../shared/services/anuncio/parameter.service";
import { ClientResponse } from "../../../Models/ClientResponseModels";
import { Router } from "@angular/router";
import { KeyBindService } from "src/app/shared/services/Utilitarios/key-bind.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  public ContainerFiltro = false;
  public ContainerMenu = false;
  public ContainerCiudadPrincipal = false;
  @Output() EnviarFiltro = new EventEmitter();
  public status: boolean = false;
  public nombreFicha: string = "";
  classNameChecked: string = "activo_on";
  metaUpKey$;
  /*Variables de Filtros */
  fromGenerales: FormGroup;
  ListDistrito: any = [];
  ListLugarAtencion: any = [];
  ListTipoServicio: any = [];
  listParameter: any;
  controlsDist: any;
  controlsLugar: any;
  controlsTipServ: any;
  txt_nombre_fichaCtrl: FormControl;
  controlsFormPago: any;
  cboPais_fichaCtrl: FormControl;
  cboEdadMin_fichaCtrl: FormControl;
  cboEdadMax_fichaCtrl: FormControl;
  cboPelo_fichaCtrl: FormControl;
  cboOjos_fichaCtrl: FormControl;
  cboEstatura_fichaCtrl: FormControl;
  cboPeso_fichaCtrl: FormControl;
  //Controles Servicios
  entidad: any = {};
  EntidadFiltro: any = {};
  limit = 16;
  //Datos del Filtro
  ListEdad: any = [];
  ListPais: any = [];
  ListCabellos: any = [];
  ListOjos: any = [];
  ListEstatura: any = [];
  ListPeso: any = [];
  ListFormaPago: any = [];
  numFilters: number = 0;
  filtroSeleccionado = [];
  contValidShowFiltro: number = 0;
  constructor(
    private parameter: ParameterService,
    private router: Router,
    //@Inject(PLATFORM_ID) private platformId: any,
    private keybind: KeyBindService
  ) {}

  ngOnInit() {
    this.cargarControlFiltros();
    // if (isPlatformBrowser(this.platformId)) {
    //   (function(){
    //     let btnBuscarFiltro = document.getElementById('btnBuscarFiltro');
    //     let btnCloseFiltro = document.getElementById('btnCloseFiltro');
    //     let body = document.getElementsByTagName('body')[0];
    //     var mediaqueryList = window.matchMedia("(max-width: 600px)");
    //     mediaqueryList.addListener(handleTabletChange);
    //     btnBuscarFiltro.onclick= function(){
    //       handleTabletChange(mediaqueryList);
    //     }
    //     btnCloseFiltro.onclick= function(){
    //       handleTabletChange(mediaqueryList);
    //     }
    //     function handleTabletChange(e) {
    //       // Check if the media query is true
    //       if (e.matches) {
    //         // Then log the following message to the console
    //         estiloComponentFiltro();
    //       }else{
    //         body.style.overflow = '';
    //         btnBuscarFiltro.style.display = '';
    //       }
    //     }
    //     function estiloComponentFiltro(){
    //       if(document.getElementById('chkBuscar')['checked']){
    //         body.style.overflow = 'hidden';
    //         btnBuscarFiltro.style.display = 'none';
    //       }else{
    //         body.style.overflow = '';
    //         btnBuscarFiltro.style.display = '';
    //       }
    //     }
    //   })();
    // }
  }
  cargarControlFiltros() {
    this.parameter.getParameterFilterHome().subscribe((res: ClientResponse) => {
      this.listParameter = JSON.parse(res.DataJson); // aqui se obtiene los paramter de la base de datos
      this.ListDistrito = this.listParameter.distritro;
      this.ListLugarAtencion = this.listParameter.lugaratencion;
      this.ListTipoServicio = this.listParameter.servicio_ofrece;
      this.ListEdad = this.listParameter.edad;
      this.ListPais = this.listParameter.pais;
      this.ListCabellos = this.listParameter.color_cabello;
      this.ListOjos = this.listParameter.color_ojos;
      this.ListEstatura = this.listParameter.estatura;
      this.ListPeso = this.listParameter.peso;
      this.ListFormaPago = this.listParameter.formapago;
      this.controlsDist = this.ListDistrito.map((c) => new FormControl(false));
      this.controlsLugar = this.ListLugarAtencion.map(
        (c) => new FormControl(false)
      );
      this.controlsTipServ = this.ListTipoServicio.map(
        (c) => new FormControl(false)
      );
      this.controlsFormPago = this.ListFormaPago.map(
        (c) => new FormControl(false)
      );
      this.txt_nombre_fichaCtrl = new FormControl("");
      this.cboPais_fichaCtrl = new FormControl("");
      this.cboEdadMin_fichaCtrl = new FormControl("");
      this.cboEdadMax_fichaCtrl = new FormControl("");
      this.cboPelo_fichaCtrl = new FormControl("");
      this.cboOjos_fichaCtrl = new FormControl("");
      this.cboEstatura_fichaCtrl = new FormControl("");
      this.cboPeso_fichaCtrl = new FormControl("");
      this.fromGenerales = new FormGroup({
        ListDistrito: new FormArray(this.controlsDist),
        ListLugarAtencion: new FormArray(this.controlsLugar),
        ListTipoServicio: new FormArray(this.controlsTipServ),
        ListFormaPago: new FormArray(this.controlsFormPago),
        txt_nombre_ficha: this.txt_nombre_fichaCtrl,
        cboPais_ficha: this.cboPais_fichaCtrl,
        cboEdadMin_ficha: this.cboEdadMin_fichaCtrl,
        cboEdadMax_ficha: this.cboEdadMax_fichaCtrl,
        cboPelo_ficha: this.cboPelo_fichaCtrl,
        cboOjos_ficha: this.cboOjos_fichaCtrl,
        cboEstatura_ficha: this.cboEstatura_fichaCtrl,
        cboPeso_ficha: this.cboPeso_fichaCtrl,
      });
    });
  }
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map((control) => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);

      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }
  onChangeDistrito(val_valor: number, isChecked: boolean) {
    let index = this.ListDistrito.findIndex((x) => x.val_valor === val_valor);
    if (isChecked) {
      this.ListDistrito[index].flag = isChecked;
    } else {
      this.ListDistrito[index].flag = isChecked;
    }
  }
  onChangeLugarAtencion(val_valor: number, event: any) {
    let index = this.ListLugarAtencion.findIndex(
      (x) => x.val_valor === val_valor
    );
    const hasClass = event.target.classList.contains(this.classNameChecked);
    this.ListLugarAtencion[index].flag = hasClass;
    let contador = 0;
    for (let i = 0; i < this.ListLugarAtencion.length; i++) {
      if (this.ListLugarAtencion[i].flag) contador++;
    }
    if (
      contador === 1 &&
      !this.filtroSeleccionado.some((element) => element == "lugar_atencion")
    ) {
      this.numFilters += 1;
      this.filtroSeleccionado.push("lugar_atencion");
    } else if (contador === 0) {
      this.numFilters -= 1;
      this.filtroSeleccionado = this.filtroSeleccionado.filter(
        (item) => item !== "lugar_atencion"
      );
    }
  }
  onChangeTipoServicio(val_valor: number, event: any) {
    let index = this.ListTipoServicio.findIndex(
      (x) => x.val_valor === val_valor
    );
    const hasClass = event.target.classList.contains(this.classNameChecked);
    this.ListTipoServicio[index].flag = hasClass;
    let contador = 0;
    for (let i = 0; i < this.ListTipoServicio.length; i++) {
      if (this.ListTipoServicio[i].flag) contador++;
    }
    if (
      contador === 1 &&
      !this.filtroSeleccionado.some((element) => element == "tipo_servicio")
    ) {
      this.numFilters += 1;
      this.filtroSeleccionado.push("tipo_servicio");
    } else if (contador === 0) {
      this.numFilters -= 1;
      this.filtroSeleccionado = this.filtroSeleccionado.filter(
        (item) => item !== "tipo_servicio"
      );
    }
  }
  onChangeFormaPago(val_valor: number, event: any) {
    let index = this.ListFormaPago.findIndex((x) => x.val_valor === val_valor);
    const hasClass = event.target.classList.contains(this.classNameChecked);
    this.ListFormaPago[index].flag = hasClass;
    let contador = 0;
    for (let i = 0; i < this.ListFormaPago.length; i++) {
      if (this.ListFormaPago[i].flag) contador++;
    }
    if (
      contador === 1 &&
      !this.filtroSeleccionado.some((element) => element == "forma_pago")
    ) {
      this.numFilters += 1;
      this.filtroSeleccionado.push("forma_pago");
    } else if (contador === 0) {
      this.numFilters -= 1;
      this.filtroSeleccionado = this.filtroSeleccionado.filter(
        (item) => item !== "forma_pago"
      );
    }
  }
  LimpiarControlesFiltros() {
    //Implementar logica limpiar controles
    this.fromGenerales.reset({
      txt_nombre_ficha: "",
      cboPais_ficha: "",
      cboEdadMin_ficha: "",
      cboEdadMax_ficha: "",
      cboPelo_ficha: "",
      cboOjos_ficha: "",
      cboEstatura_ficha: "",
      cboPeso_ficha: "",
    });
    this.ListDistrito.forEach((element) => {
      element.flag = false;
    });
    this.ListLugarAtencion.forEach((element) => {
      element.flag = false;
    });
    this.ListTipoServicio.forEach((element) => {
      element.flag = false;
    });
    this.ListFormaPago.forEach((element) => {
      element.flag = false;
    });
    let filtros = document.getElementsByClassName("bloque_categorias");
    for (let i = 0; i < filtros.length; i++) {
      let control = filtros[i].getElementsByClassName("disponible_on");
      for (let e = 0; e < control.length; e++) {
        let filtroChecked = control[e];
        filtroChecked.classList.remove("activo_on");
        filtroChecked.classList.add("activo_off");
      }
    }
    this.numFilters = 0;
    this.filtroSeleccionado = [];
  }
  check(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      event.target.classList.remove(className);
      event.target.classList.add("activo_on");
      //event.removeClass(event.target, className);
    } else {
      event.target.classList.add(className);
      event.target.classList.remove("activo_on");
      //event.addClass(event.target, className);
    }
  }
  consultar() {
    const selectedFormaPago = this.ListFormaPago.filter((x) => {
      return x.flag == true;
    })
      .map((x) => {
        return x.val_valor;
      })
      .join(",");
    const selectedLugarAtencion = this.ListLugarAtencion.filter((x) => {
      return x.flag == true;
    })
      .map((x) => {
        return x.val_valor;
      })
      .join(",");
    const selectedTipoServicio = this.ListTipoServicio.filter((x) => {
      return x.flag == true;
    })
      .map((x) => {
        return x.val_valor;
      })
      .join(",");
    this.entidad.tx_forma_pago = selectedFormaPago;
    this.entidad.tx_lugar_atencion = selectedLugarAtencion;
    this.entidad.tx_servicios_ofrece = selectedTipoServicio;
    this.entidad.cbo_pais_ficha = this.fromGenerales.value.cboPais_ficha;
    this.entidad.cbo_edad_min_ficha = this.fromGenerales.value.cboEdadMin_ficha;
    this.entidad.cbo_edad_max_ficha = this.fromGenerales.value.cboEdadMax_ficha;
    this.entidad.cbo_pelo_ficha = this.fromGenerales.value.cboPelo_ficha;
    this.entidad.cbo_ojos_ficha = this.fromGenerales.value.cboOjos_ficha;
    this.entidad.cbo_estatura_ficha =
      this.fromGenerales.value.cboEstatura_ficha;
    this.entidad.cbo_peso_ficha = this.fromGenerales.value.cboPeso_ficha;
    this.entidad.txt_nombre_ficha = this.fromGenerales.value.txt_nombre_ficha;
    this.EnviarFiltro.emit({ entidad: this.entidad });
  }
  getCheboxerSeleccionado(ListSeleccionado: any): string {
    let selecionado: string = "";
    for (let index = 0; index < ListSeleccionado.length; index++) {
      selecionado += ListSeleccionado[index] + ",";
    }
    selecionado = selecionado.substring(0, selecionado.length - 1);
    return selecionado;
  }

  btnMostrarContainerCuidadesPrincipales(): void {
    this.ContainerCiudadPrincipal = !this.ContainerCiudadPrincipal;
    // if (this.ContainerCiudadPrincipal){
    //   document.body.style.overflow = "hidden";
    // }else{
    //   document.body.style.overflow = "auto";
    // }
  }
  btnMostrarContainerMenu(): void {
    this.ContainerMenu = !this.ContainerMenu;
    if (this.ContainerMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
  btnMostrarContainerFiltro(): void {
    this.ContainerFiltro = !this.ContainerFiltro;
    if (this.ContainerFiltro) {
      document.body.style.overflow = "hidden";
      // Typical use case
      this.metaUpKey$ = this.keybind.match("ESCAPE", []).subscribe(() => {
        this.btnOcultarContainerFiltro();
        this.metaUpKey$.unsubscribe();
        this.contValidShowFiltro = 0;
      });
    } else document.body.style.overflow = "auto";
  }
  btnOcultarContainerFiltro(): void {
    document.body.style.overflow = "scroll";
    this.ContainerFiltro = !this.ContainerFiltro;
  }
  btnPublicarAnuncio(): void {
    this.btnMostrarContainerMenu();
    this.router.navigate(["/anunciategratis"]);
  }
  btnPublicarContactar(): void {
    this.btnMostrarContainerMenu();
    this.router.navigate(["/home/contactar-cliente"]);
  }
  btnEliminarFiltro() {
    this.LimpiarControlesFiltros();
  }
  onChangeEdadMin() {
    let edadMin: number = Number(this.fromGenerales.value.cboEdadMin_ficha);
    let edadMax: number = Number(this.fromGenerales.value.cboEdadMax_ficha);
    if (this.fromGenerales.value.cboEdadMin_ficha === "")
      this.fromGenerales.controls.cboEdadMax_ficha.setValue("");
    else {
      if (this.fromGenerales.value.cboEdadMax_ficha === "")
        this.fromGenerales.controls.cboEdadMax_ficha.setValue(
          this.ListEdad[this.ListEdad.length - 1].val_valor
        );
      else if (edadMin > edadMax)
        this.fromGenerales.controls.cboEdadMax_ficha.setValue(edadMin);
    }

    if (!this.filtroSeleccionado.some((element) => element == "edad")) {
      this.numFilters += 1;
      this.filtroSeleccionado.push("edad");
    } else if (
      this.fromGenerales.value.cboEdadMin_ficha === "" &&
      this.fromGenerales.value.cboEdadMax_ficha === "" &&
      this.filtroSeleccionado.some((element) => element == "edad")
    ) {
      this.numFilters -= 1;
      this.filtroSeleccionado = this.filtroSeleccionado.filter(
        (item) => item !== "edad"
      );
    }
  }
  onChangeEdadMax() {
    let edadMin: number = Number(this.fromGenerales.value.cboEdadMin_ficha);
    let edadMax: number = Number(this.fromGenerales.value.cboEdadMax_ficha);
    if (this.fromGenerales.value.cboEdadMax_ficha === "")
      this.fromGenerales.controls.cboEdadMin_ficha.setValue("");
    else {
      if (this.fromGenerales.value.cboEdadMin_ficha === "")
        this.fromGenerales.controls.cboEdadMin_ficha.setValue(
          this.ListEdad[0].val_valor
        );
      else if (edadMin > edadMax)
        this.fromGenerales.controls.cboEdadMin_ficha.setValue(edadMax);
    }

    if (!this.filtroSeleccionado.some((element) => element == "edad")) {
      this.numFilters += 1;
      this.filtroSeleccionado.push("edad");
    } else if (
      this.fromGenerales.value.cboEdadMin_ficha === "" &&
      this.fromGenerales.value.cboEdadMax_ficha === "" &&
      this.filtroSeleccionado.some((element) => element == "edad")
    ) {
      this.numFilters -= 1;
      this.filtroSeleccionado = this.filtroSeleccionado.filter(
        (item) => item !== "edad"
      );
    }
  }
  onChangePais() {
    if (!this.filtroSeleccionado.some((element) => element == "pais")) {
      this.numFilters += 1;
      this.filtroSeleccionado.push("pais");
    } else if (
      this.fromGenerales.value.cboPais_ficha === "" &&
      this.filtroSeleccionado.some((element) => element == "pais")
    ) {
      this.numFilters -= 1;
      this.filtroSeleccionado = this.filtroSeleccionado.filter(
        (item) => item !== "pais"
      );
    }
  }
  onChangeEstatura() {
    if (!this.filtroSeleccionado.some((element) => element == "estatura")) {
      this.numFilters += 1;
      this.filtroSeleccionado.push("estatura");
    } else if (
      this.fromGenerales.value.cboEstatura_ficha === "" &&
      this.filtroSeleccionado.some((element) => element == "estatura")
    ) {
      this.numFilters -= 1;
      this.filtroSeleccionado = this.filtroSeleccionado.filter(
        (item) => item !== "estatura"
      );
    }
  }
  onChangePeso() {
    if (!this.filtroSeleccionado.some((element) => element == "peso")) {
      this.numFilters += 1;
      this.filtroSeleccionado.push("peso");
    } else if (
      this.fromGenerales.value.cboPeso_ficha === "" &&
      this.filtroSeleccionado.some((element) => element == "peso")
    ) {
      this.numFilters -= 1;
      this.filtroSeleccionado = this.filtroSeleccionado.filter(
        (item) => item !== "peso"
      );
    }
  }
  onChangeOjos() {
    if (!this.filtroSeleccionado.some((element) => element == "ojos")) {
      this.numFilters += 1;
      this.filtroSeleccionado.push("ojos");
    } else if (
      this.fromGenerales.value.cboOjos_ficha === "" &&
      this.filtroSeleccionado.some((element) => element == "ojos")
    ) {
      this.numFilters -= 1;
      this.filtroSeleccionado = this.filtroSeleccionado.filter(
        (item) => item !== "ojos"
      );
    }
  }
  onChangePelo() {
    if (!this.filtroSeleccionado.some((element) => element == "pelo")) {
      this.numFilters += 1;
      this.filtroSeleccionado.push("pelo");
    } else if (
      this.fromGenerales.value.cboPelo_ficha === "" &&
      this.filtroSeleccionado.some((element) => element == "pelo")
    ) {
      this.numFilters -= 1;
      this.filtroSeleccionado = this.filtroSeleccionado.filter(
        (item) => item !== "pelo"
      );
    }
  }
  @HostListener("document:click", ["$event"])
  onDocumentClick(event) {
    let navegacionCategoria = document.getElementById("navegacion_categorias")
      .style.display;
    let isOutside = event.target.closest(".div_navegacion");
    if (navegacionCategoria === "block") {
      this.contValidShowFiltro++;
      if (
        event.target.parentElement["id"] == "navegacion_categorias" &&
        isOutside === null &&
        this.contValidShowFiltro > 1
      ) {
        this.btnOcultarContainerFiltro();
        this.metaUpKey$.unsubscribe();
        this.contValidShowFiltro = 0;
      }
    }
  }
}