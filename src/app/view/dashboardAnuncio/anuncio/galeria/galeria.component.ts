import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { debug } from 'util';
// import { Galeria, Fileinput } from "../../../models/modelanuncio";
@Component({
    selector: 'app-galeria',
    templateUrl: './galeria.component.html',
    styleUrls: ['./galeria.component.css']

})
export class GaleriaComponent implements OnInit {
    imageSrc: any;
    constructor(
        private anuncioService: AnuncioService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.anuncioService.segundopaso(true);
        this.anuncioService.tercerpaso(true);
        this.anuncioService.cuartopaso(true);
        this.anuncioService.quintopaso(true);
        this.anuncioService.sextopaso(true);
    }
    // onFileChange(event) {
    //     let reader = new FileReader();

    //     if (event.target.files && event.target.files.length) {
    //         const [file] = event.target.files;
    //         reader.readAsDataURL(file);

    //         reader.onload = () => {
    //             this.formGroup.patchValue({
    //                 file: reader.result
    //             });

    //             // need to run CD since file load runs outside of zone
    //             this.cd.markForCheck();
    //         };
    //     }
    // }
    displayPhoto(fileInput) {
        // var binary;
        // if (fileInput.target.files && fileInput.target.files[0]) {
        //     const reader = new FileReader();

        //     if (fileInput.target.files && fileInput.target.files.length > 0) {
        //         let file = fileInput.target.files[0];
        //         reader.readAsDataURL(file);
        //         // reader.onload = () => {
        //         //   this.form.get('avatar').setValue({
        //         //     filename: file.name,
        //         //     filetype: file.type,
        //         //     value: reader.result.split(',')[1]
        //         //   })
        //         // };
        //          binary = reader.result.split(',')[1];
        //     }



        //     reader.onload = ((e) => {
        //         this.imageSrc = e.target['result'];
        //     });

        //     reader.readAsDataURL(fileInput.target.files[0]);
        // }
    }
    btnAtras() {
        this.router.navigate(['DashboardAnuncion/nuevoanuncio/servicios']);
    }
}
