import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private adminRole = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isAdmin() {
    return this.adminRole.asObservable();
  }

  constructor(private router: Router) { }

  login(user: User) {
    // TODO JWT STUFF
    
    
    // PUT THIS IN AFTER AUTHENTICATING
    this.loggedIn.next(true);
    this.router.navigate(['/']);
  }

  logout() { 
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
