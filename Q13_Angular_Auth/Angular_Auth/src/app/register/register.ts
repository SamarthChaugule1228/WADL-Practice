import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {

  user = {
    name: '',
    email: '',
    username: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  registerUser() {
    this.auth.register(this.user);
    alert("Registered Successfully");
    this.router.navigate(['/']);
  }
}