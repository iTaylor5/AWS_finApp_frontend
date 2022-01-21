import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subcategory } from './subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {


  // private baseUrl = "http://localhost:8080/api/transactionSubcategories/"

  private baseUrl = environment.baseUrl + "/transactionSubcategories";

  constructor(private httpClient: HttpClient) { }

  getSubcategory(id): Observable<Subcategory[]> {
    return this.httpClient.get<GetResponseSubcategory>(this.baseUrl + "/get/id=" + id).pipe(
      map(respone => respone.list)
    )
  }

  getSubcategoryByName(name: string): Observable<Subcategory> {
    // 'http://localhost:8080/api/transactionSubcategories/getByName?name=' + name
    return this.httpClient.get<Subcategory>(this.baseUrl + '/getByName?name=' + name);

  }

  addSubcategory(subcatName: string, catName: string) {
    console.log("In addSucategory and adding: " + subcatName + " to the category named: " + catName);
    // let url = 'http://localhost:8080/api/transactionSubcategories/add/' + catName + '/' + subcatName;
    let url = this.baseUrl + '/add/' + catName + '/' + subcatName;
    return this.httpClient.get<Subcategory>(url);

  }

  deleteSubcategory(id) {
    console.log("In SubcategoryService.deleteSubcategory(" + id + ")");
    // http://localhost:8080/api/transactionSubcategories
    return this.httpClient.get<Subcategory>(this.baseUrl + "/deleteSubcategory?id=" + id);
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

interface GetResponseSubcategory {
  list: Subcategory[];
}


