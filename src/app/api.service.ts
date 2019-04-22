import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "/api";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  private handleError(error: HttpErrorResponse) {
	  if (error.error instanceof ErrorEvent) {
		// A client-side or network error occurred. Handle it accordingly.
		console.error('An error occurred:', error.error.message);
	  } else {
		// The backend returned an unsuccessful response code.
		// The response body may contain clues as to what went wrong,
		console.error(
		  `Backend returned code ${error.status}, ` +
		  `body was: ${error.error}`);
	  }
	  // return an observable with a user-facing error message
	  return throwError('Something bad happened; please try again later.');
  };
  
  private extractData(res: Response) {
	  let body = res;
	  return body || { };
  }
  
  getEmployees(): Observable<any> {
	  return this.http.get(apiUrl, httpOptions).pipe(
		map(this.extractData),
		catchError(this.handleError));
	}
  
  getFilteredEmployees(name: string): Observable<any> {
	  const url = `${apiUrl}/employee-search/${name}`;
	  return this.http.get(url, httpOptions).pipe(
		map(this.extractData),
		catchError(this.handleError));
	}
  getEmployee(id: string): Observable<any> {
	  const url = `${apiUrl}/${id}`;
	  return this.http.get(url, httpOptions).pipe(
		map(this.extractData),
		catchError(this.handleError));
  }
  getEmployeeTimeInOut(id: string): Observable<any> {
	  const url = `${apiUrl}/details-time-in-out/${id}`;
	  return this.http.get(url, httpOptions).pipe(
		map(this.extractData),
		catchError(this.handleError));
  }
  getEmployeeTimeInOutFiltered(id: string): Observable<any> {
	  const url = `${apiUrl}/filtered-time-in-out/${id}`;
	  return this.http.get(url, httpOptions).pipe(
		map(this.extractData),
		catchError(this.handleError));
  }
  postEmployeeNewDateTime(data): Observable<any> {
	  const url = `${apiUrl}/add-date-time/`;
	  return this.http.post(url, data, httpOptions)
		.pipe(
		  catchError(this.handleError)
		);
  }
  postEmployee(data): Observable<any> {
	  return this.http.post(apiUrl, data, httpOptions)
		.pipe(
		  catchError(this.handleError)
		);
  }
  updateEmployee(id, data): Observable<any> {
      const url = `${apiUrl}/${id}`;
	  return this.http.put(url, data, httpOptions)
		.pipe(
		  catchError(this.handleError)
		);
  }
  updateEmployeeTimeInOut(_id, data): Observable<any> { 
      const url = `${apiUrl}/edit-time/${_id}`;
	  console.log(url);
	  return this.http.put(url, data, httpOptions)
		.pipe(
		  catchError(this.handleError)
		);
  }
  deleteEmployee(id: string): Observable<{}> {
	  const url = `${apiUrl}/${id}`;
	  return this.http.delete(url, httpOptions)
		.pipe(
		  catchError(this.handleError)
		);
  }
  deleteEmployeeDateTime(id: string): Observable<{}> {
	  const url = `${apiUrl}/delete-time/${id}`;
	  return this.http.delete(url, httpOptions)
		.pipe(
		  catchError(this.handleError)
		);
  }
  postTest(data): Observable<any> {
	  const url = `${apiUrl}/test`;
	  return this.http.post(url, data, httpOptions)
		.pipe(
		  catchError(this.handleError)
		);
	  console.log(data);
  }
  
}
