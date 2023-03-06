import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Technology } from '../model/technology';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(private http:HttpClient) { }

  apiURL = 'http://localhost:5000/api';
  
  getHttpOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'x-access-token': localStorage.getItem('token') || ''
      })
    };
    return httpOptions;
  }
 
  // Return only the published technologies
  getPublishedTechnologies(): Observable<Technology[]> {
    return this.http
      .get<Technology[]>(this.apiURL + '/technologies/published', this.getHttpOptions())
      .pipe(retry(1), catchError(this.handleError));
  }

  // Return all technologies in the db (including non published)
  getAllTechnologies(): Observable<Technology[]> {
    return this.http
      .get<Technology[]>(this.apiURL + '/technologies/all', this.getHttpOptions())
      .pipe(retry(1), catchError(this.handleError));
  }

  // Return a technology by its given id
  getTechnology(id: any): Observable<Technology> {
    return this.http
      .get<Technology>(this.apiURL + '/technologies/' + id, this.getHttpOptions())
      .pipe(retry(1), catchError(this.handleError));
  }

  // Add a new technology 
  createTechnology(technology: any): Observable<Technology> {
    return this.http
      .post<Technology>(
        this.apiURL + '/technologies',
        JSON.stringify(technology),
        this.getHttpOptions()
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Update an existing technology
  updateTechnology(id: any, technology: any): Observable<Technology> {
    return this.http
      .put<Technology>(
        this.apiURL + '/technologies/' + id,
        JSON.stringify(technology),
        this.getHttpOptions()
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Publish an existing technology
  publishTechnology(id: any): Observable<Technology> {
    const body = { published : 'true', publishedAt : Date.now() }; // Need to send user id aswell
    return this.http
      .put<Technology>(
        this.apiURL + '/technologies/' + id,
        JSON.stringify(body),
        this.getHttpOptions()
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Remove a given technology by its id
  deleteTechnology(id: any) {
    return this.http
      .delete<Technology>(this.apiURL + '/technologies/' + id, this.getHttpOptions())
      .pipe(retry(0), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
