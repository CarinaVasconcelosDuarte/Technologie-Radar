import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  hide = true;

  constructor(
    private authService: AuthService
  ) {}

  get username() : any{
    return this.login.get("username");
  }

  get password() : any{
    return this.login.get("password");
  }

  get loginData() : User{
    return {
      username : this.username.value,
      password : this.password.value
    };
  }

  onSubmit() {
    if (this.login.valid) {
      this.authService.login(this.loginData);
    }
  }
}
