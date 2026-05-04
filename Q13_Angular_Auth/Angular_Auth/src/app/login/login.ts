import { Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AuthService } from '../auth'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl:'./login.html'
})

export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private  router: Router) { }
  loginUser()
  {
    if (this.auth.login(this.username, this.password))
    {
      alert("login Successfully ");
      this.router.navigate(['/profile']);
    }
  }
  
}