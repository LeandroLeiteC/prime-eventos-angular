import { CasaDeShowService } from '../../../core/casa-de-show/casa-de-show.service';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { CasaDeShow } from 'src/app/core/casa-de-show/casa-de-show.model';

export class TabelaCasasDeShowDataSource implements DataSource<CasaDeShow> {
    
    private casaDeShowSubject = new BehaviorSubject<CasaDeShow[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    totalElements: number;
    public loading$ = this.loadingSubject.asObservable();

    constructor(private casaDeShowService: CasaDeShowService){ }
    
    connect(collectionViewer: CollectionViewer): Observable<CasaDeShow[] | readonly CasaDeShow[]> {
        return this.casaDeShowSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.casaDeShowSubject.complete();
        this.loadingSubject.complete();
    }

    loadCasasDeShow(page: number) {
        this.loadingSubject.next(true);
        this.casaDeShowService.getAll(page, '')
        .pipe(
            catchError( e => this.handleError(e) ),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe( res => {
            this.casaDeShowSubject.next(res.content);
            this.totalElements = res.totalElements;
        });
    }

    handleError(e: any): Observable<any>{
        console.log(e);
        return EMPTY;
      }

}