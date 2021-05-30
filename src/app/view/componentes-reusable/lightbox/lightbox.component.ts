import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { ImageService } from "src/app/shared/services/Utilitarios/image.service";

@Component({
    selector: 'app-lightbox',
    templateUrl: "./lightbox.component.html",
    styleUrls: ['./lightbox.component.css'],
    encapsulation: ViewEncapsulation.None
  })
  export class LightboxComponent implements OnInit {

    imagenes: [];
    slideIndex = 0;
    
    constructor(
        public modalRef: BsModalRef,
        private imageService: ImageService
    ) {
    }

    ngOnInit(): void {
        this.loadImages(this.imagenes);
    }

    loadImages(images): void {
        this.imageService.fetchImages(images)
        .subscribe(images => this.imagenes = images);
    }

    closeLightbox() {
        this.modalRef.hide();
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }

    showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("img-slides") as HTMLCollectionOf<HTMLElement>;
        const dots = document.getElementsByClassName("images")as HTMLCollectionOf<HTMLElement>;
        if (n > slides.length) {this.slideIndex = 1}
        if (n < 1) {this.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex-1].style.display = "block";
        if (dots && dots.length > 0) {
          dots[this.slideIndex-1].className += " active";
        }
    }

    ngAfterViewInit() {
        this.showSlides(this.slideIndex);
      }
  }