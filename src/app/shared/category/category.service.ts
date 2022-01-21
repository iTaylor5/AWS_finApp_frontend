import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subcategory } from '../subcategory/subcategory';
import { Category } from './category';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  // private baseUrl = "http://localhost:8080/api/transactionCategories";
  private baseUrl = environment.baseUrl + "/transactionCategories";

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<GetResponseCategory>(this.baseUrl).pipe(
      map(response => response._embedded.transactionCategories)
    )
  }

  getCategoryFromName(name: string): Observable<Category> {

    console.log("getCategoryFromName()" + "name is " + name);
    let query = name.split(' ').join('+');
    console.log("query is: " + query)
    // 'http://localhost:8080/api/transactionCategories/getByName/' + query
    return this.httpClient.get<Category>(this.baseUrl + '/getByName/' + query);

  }

  //TODO: add id to url
  getSubcategories(cat: Category): Observable<Subcategory[]> {
    console.log("in getSubcategories. cat.id=" + cat.id);
    // 'http://localhost:8080/api/transactionCategories/getSubcategories?id='
    return this.httpClient.get<Subcategory[]>(this.baseUrl + '/getSubcategories?id=' + cat.id);
  }

  addCategory(categoryName: string): Observable<any> {
    console.log("In categoryService and adding this name to categories: " + categoryName);

    // const baseUrl = "http://localhost:8080/api/transactionCategories/add";

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    return this.httpClient.post(this.baseUrl + "/add", categoryName, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteCategory(id: number): Observable<any> {
    console.log("id:" + id);

    // let reply;
    // http://localhost:8080/api/transactionCategories
    return this.httpClient.get<SearchResults>(this.baseUrl + '/deleteCategoryById?id=' + id);
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

interface GetResponseCategory {
  _embedded: {
    transactionCategories: Category[];
  }
}

interface SearchResults {
  answer: string;
}