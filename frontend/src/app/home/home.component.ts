import { Component } from '@angular/core';
import { AuthService } from '../shared/AuthService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.isLoggedIn = this.checkLoginStatus();
  }

  login() {
    this.router.navigate(['/home']);
    this.isLoggedIn = true;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private checkLoginStatus(): boolean {
    return true;
  }
}
