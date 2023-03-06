import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  // NOTE: $ -> indentifier to see that its an observable c:
  isLoggedIn$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;
  
  constructor(private authService: AuthService) {};

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAdmin$ = this.authService.isAdminObserver;
  }

  onLogout() {
    this.authService.logout();
  }
}
