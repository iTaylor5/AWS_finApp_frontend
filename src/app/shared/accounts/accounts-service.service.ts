import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // private baseUrl = "http://localhost:8080/api/accounts";
  private baseUrl = environment.baseUrl + "/accounts";

  constructor(private httpClient: HttpClient) { }

  getAccountList(): Observable<Account[]> {
    return this.httpClient.get<GetResponseAccounts>(this.baseUrl).pipe(
      map(response => response._embedded.accounts)
    );
  }

  getAccount(name: string): Observable<Account> {
    return this.httpClient.get<Account>(this.baseUrl + '/getByName?name=' + name);
  }


  addAccount(acc: Account): Observable<Account> {
    console.log("In accountService: addAccount()");

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    return this.httpClient.post<Account>(this.baseUrl + "/add", acc, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteMemberbyName(name: string): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "/delete/" + name);
  }


  // "/updateAccountName/{id}/{name}"
  public patchAccountName(id: number, newAccountName: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    // not a great way I know
    return this.httpClient.patch(this.baseUrl + "/updateAccountName/" + id + "/" + newAccountName, httpOptions, {})
  }

  // "/updateAccountName/{id}/{currency}"
  public patchAccountCurrency(id: number, newAccCurrency: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    // not a great way I know
    return this.httpClient.patch(this.baseUrl + "/updateAccountCurrency/" + id + "/" + newAccCurrency, httpOptions, {})
  }

  // "/updateAccountBalance/{id}/{currency}"
  public patchAccountBalance(id: number, newAccBalance: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    // not a great way I know
    return this.httpClient.patch(this.baseUrl + "/updateAccountBalance/" + id + "/" + newAccBalance, httpOptions, {})
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

interface GetResponseAccounts {
  _embedded: {
    accounts: Account[];
  }
}

interface GetResponseAccount {
  account: Account;
}
