import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RegisterDTO } from 'src/app/core/entities/RegisterDTO';
import { UserService } from 'src/app/core/services/user-service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private userService: UserService, private router: Router) {

  }

  register() {
    const registerData: RegisterDTO = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.userService.register(registerData).subscribe(response => {
      console.log('Register successful:', response);
      this.userService.setLocalStorage(response);
      this.router.navigate(['']);
    },
      error => {
        console.error('Login error:', error);
        alert('Username or email taken. Please try again.');
      }
    );
  }

}
