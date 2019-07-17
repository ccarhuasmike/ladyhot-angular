import { Component, OnInit, TemplateRef } from '@angular/core';
import { MantenimientoAnuncioService } from 'src/app/shared/services/mantenimiento-anuncio/mantenimiento-anuncio.service';
import { Pagination } from 'src/app/Models/ClientResponseModels';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalActualizaAnuncio } from '../modal-actualizar-anuncio/modal-actualizar-anuncio.component';
import { AnuncioService } from 'src/app/shared/services/service.module';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listado',
    templateUrl: './listado.component.html',
    styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
    modalRef: BsModalRef;    
    listado: any[];
    flagexistRegistro: any = true;   
    paginacion =new Pagination();       
    codigo: string = "";
    // web para guiarse con la paginacion
    //https://valor-software.com/ngx-bootstrap/#/pagination
    ngOnInit(): void {        
        this.loadDatos();
    }
    pageChanged(event: any): void {
        this.paginacion.CurrentPage = event.page;
        this.loadDatos();
    };
    constructor(
        private mantenimientoAnuncioService: MantenimientoAnuncioService,
        private modalService: BsModalService,
        private anuncioService: AnuncioService,
        private router: Router
    ) { 
        this.paginacion.ItemsPerPage = 5;
        this.paginacion.TotalItems = 0;
        this.paginacion.CurrentPage = 1;
    }
    loadDatos(): void {        
        this.mantenimientoAnuncioService.ListaPaginado(this.paginacion).subscribe(
            (res) => {                
                if (res.Status = 'OK') {                    
                    this.listado = JSON.parse(res.DataJson);
                    console.log(this.listado[0]);
                }
                if (this.listado.length > 0) {
                    this.flagexistRegistro = true;
                    let  paginacionResponse = JSON.parse(res.paginacion);                
                    this.paginacion.TotalItems = paginacionResponse.TotalItems;
                } else {
                    this.flagexistRegistro = false;
                }               
            },
            error => {
            }
        );
    }   

    modalEditar(id: string) {
        this.modalRef = this.modalService.show(ModalActualizaAnuncio, {
            class: 'modal-lg' ,
            initialState: {
                title: 'Actualizar Anuncio Demo',
                data: {
                    id: id
                }
            }
        });
    }

    darBaja(modalConfirmacion: TemplateRef<any>, codigo) {
        this.modalRef = this.modalService.show(modalConfirmacion, { class: 'modal-sm' });
        this.codigo = codigo;
    }

    confirmarDarBaja() {
        let entidad: any = {};
        entidad.cod_anuncio_encryptado = this.codigo;
        if (this.codigo != null) {
            this.anuncioService.darBajaMiAnuncio(entidad).subscribe(
                (res) => {
                    if (res.Status == "OK") {
                        this.modalRef.hide()
                        this.router.navigate(['panelcontrol/mantenimiento-anuncio']);
                    } else {
                        console.log("ejecute Error");
                    }
                }
            );
        }
    }
    cancelarDarBaja() {
        this.modalRef.hide();
    }
}