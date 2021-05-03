import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable()
export class ImageService {

  setGroupFilter$ = new Subject<any>();
  getGroupFilter = this.setGroupFilter$.asObservable();

  constructor() {}

  fetchImages(images): Observable<any> {
    return of(images);
  }
}