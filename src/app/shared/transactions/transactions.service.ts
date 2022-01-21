import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Page } from 'src/app/pagination/page';
import { Pageable } from 'src/app/pagination/pageable';
import { environment } from 'src/environments/environment';
import { PostTransaction } from '../post-transaction/post-transaction';
import { Transaction } from './transaction';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private baseUrl: string = environment.baseUrl + "/transactions";

  constructor(private httpClient: HttpClient) { }

  addTransaction(postTransaction: PostTransaction): Observable<any> {

    // const basUrl = environment.baseUrl + "transactions/add";

    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // }

    return this.httpClient.post(this.baseUrl + "/add", postTransaction, httpOptions);

  }

  getTransactionList(): Observable<Transaction[]> {
    return this.httpClient.get<GetResponseTransactions>(this.baseUrl).pipe(
      map(response => response._embedded.transactions)
    );
  }

  getTransaction(id: number): Observable<Transaction> {
    return this.httpClient.get<Transaction>(this.baseUrl + "/" + id);
  }

  putTransaction(transaction: Transaction) {

    console.log("In the TransactionsService, and received: " + transaction);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    return this.httpClient.put<Transaction>(this.baseUrl + "/update/", transaction, httpOptions)
      .pipe(
        catchError(this.handleError)
      )

  }



  getTransactionListPaginete(thePage: number, thePageSize: number): Observable<GetResponseTransactions> {

    const searchUrl = `${this.baseUrl}/list?`
      + `&page=${thePage}&size=${thePageSize}`;

    console.log(searchUrl);
    return this.httpClient.get<GetResponseTransactions>(searchUrl);
  }

  public getPage(pageable: Pageable): Observable<Page<Transaction>> {
    // let url = "http://localhost:8080/api/transactions/list"
    //   + '?page=' + pageable.pageNumber
    //   + '&size=' + pageable.pageSize
    //   + '&sort=id';
    let url = this.baseUrl + "/list"
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + '&sort=id';

    return this.httpClient.get<Page<Transaction>>(url, httpOptions);
  }

  public deleteTransaction(id: number) {
    return this.httpClient.delete(this.baseUrl + "/delete/" + id);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something terrible happened'));
  }
}

interface GetResponseTransactions {
  _embedded: {
    transactions: Transaction[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}