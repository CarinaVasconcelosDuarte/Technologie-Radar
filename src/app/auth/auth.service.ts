import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, retry, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());
  private adminRole = new BehaviorSubject<boolean>(false);
  loaded = false;

  apiURL = 'http://localhost:5000/api';
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': ''
      })
  };

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isAdmin() {
    return this.adminRole.value;
  }

  get isAdminObserver() {
    return this.adminRole.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) { }

  login(user: User) {    
    const formData = { username : user.username, password : user.password };
    let data = this.http.post<User>(this.apiURL + '/user/login', JSON.stringify(formData), this.httpOptions)
                        .pipe(retry(1), catchError(this.handleError))
                        .subscribe(data => {
                          if(data._id != ''){
                            localStorage.setItem('token', data.token||'');
                            this.adminRole.next(data.isAdmin || false);
                            this.loggedIn.next(true);
                            this.router.navigate(['/']);
                          } else {
                            this.logout();
                          }
                        })
  }

  ngOnInit() {
    this.loaded = true;
  }

  logout() { 
    this.loggedIn.next(false);
    this.adminRole.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  private checkToken() : boolean {

    let token = localStorage.getItem('token');
    token = !token ? '': token;
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': ''
      })
    }
    if (this.loaded) {
      let data = this.http.get<any>(this.apiURL + '/user/validate', options);
      data.subscribe( data => {
        return data.message == 'valid';
      })
    }
    return false;
  } 

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
