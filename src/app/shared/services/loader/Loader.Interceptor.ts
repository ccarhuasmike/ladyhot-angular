
import { Injectable, EventEmitter } from '@angular/core';
import { HttpRequest, HttpEvent, HttpInterceptor, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from "./loader.service";
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    // private static START_DELAY_MS: number = 100;
    // private totalRequests: number = 0;
    // private completedRequests: number = 0;
    // private progressEmitter: EventEmitter<number> = new EventEmitter<number>();

    constructor(private loaderService: LoaderService) { }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        this.requests.splice(i, 1);
        this.loaderService.isLoading.next(this.requests.length > 0);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //this.totalRequests++;
        // Inform subscribers that another request has been received:
        this.loaderService.increase();
        this.requests.push(req);
        this.loaderService.isLoading.next(true);
        return Observable.create(observer => {
            const subscription = next.handle(req)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                            this.loaderService.decrease();
                            //this.onRequestComplete();
                        }
                    },
                    err => {
                        this.removeRequest(req); observer.error(err);
                        //this.onRequestComplete();
                    },
                    () => { this.removeRequest(req); observer.complete(); });
            // teardown logic in case of cancelled requests
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
    // private onRequestComplete(): void {
    //     this.completedRequests++;
    //     this.emitProgress();
    //     if (this.completedRequests === this.totalRequests) {    
    //         this.onRequestsComplete();
    //     }
    // }

    // private onRequestsComplete(): void {
    //     this.totalRequests = 0;
    //     this.completedRequests = 0;
    // }

    // private emitProgress(): void {
    //     this.progressEmitter.emit(this.completedRequests / this.totalRequests);
    // }
}