import { Injectable } from '@angular/core';
import {Author, Book, Image} from './book';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = "http://bookstore19.schoenboeck.kwmhgb.at/api";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Book>>{
    return this.http.get(`${this.api}/books`)
    .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(isbn): Observable<Book>{
    return this.http.get(`${this.api}/book/${isbn}`).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any>{
    return throwError(error);
  }
}
