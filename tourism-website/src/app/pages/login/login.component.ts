import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/core/entities/LoginDTO';
import { LoginResponse } from 'src/app/core/entities/LoginResponse';
import { UserService } from 'src/app/core/services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {

  }

  login() {
    const loginData: LoginDTO = {
      username: this.username,
      password: this.password
    };

    this.userService.login(loginData).subscribe(response => {
      this.userService.setLocalStorage(response);
      this.router.navigate(['']);
    },
      error => {
        alert('Incorrect credentials. Please try again.');

      }
    );
  }
}
