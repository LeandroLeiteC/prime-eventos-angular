import { EventoService } from './../../../core/evento/evento.service';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { Evento } from './../../../core/evento/evento.model';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';

export class TabelaEventoDataSource implements DataSource<Evento> {
    
    private eventoSubject = new BehaviorSubject<Evento[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    totalElements: number;
    public loading$ = this.loadingSubject.asObservable();

    constructor(private eventoService: EventoService){ }
    
    connect(collectionViewer: CollectionViewer): Observable<Evento[] | readonly Evento[]> {
        return this.eventoSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.eventoSubject.complete();
        this.loadingSubject.complete();
    }

    loadEventos(page: number) {
        this.loadingSubject.next(true);
        this.eventoService.getAll(page)
        .pipe(
            catchError( e => this.handleError(e) ),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe( res => {
            this.eventoSubject.next(res.content);
            this.totalElements = res.totalElements;
        });
    }

    handleError(e: any): Observable<any>{
        console.log(e);
        return EMPTY;
      }

}