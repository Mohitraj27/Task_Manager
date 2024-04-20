import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/AuthService';

function emailValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (control.value && !emailRegex.test(control.value)) {
    return { invalidEmail: true };
  }
  return null;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private apiService: ApiserviceService,
    private fb: FormBuilder,

    private authService: AuthService,
    private route: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.route.navigate(['/home']);
    }
  }
  showPassword = false;

  togglePasswordVisibility(event: MouseEvent): void {
    event.preventDefault(); // Prevent form submit
    this.showPassword = !this.showPassword;
  }

  submit() {
    // Prevent login if a token already exists
    if (localStorage.getItem('token')) {
      alert('User Already Logged in');
      this.route.navigate(['/login']);
    }
    // Mark all form controls as touched to trigger error messages
    Object.values(this.loginForm.controls).forEach((control) =>
      control.markAsTouched()
    );

    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.apiService.userLogin(loginData).subscribe(
        (response) => {
          // handle successful login response
          console.log('Successful login');

          // Update authentication state
          this.authService.login(response.token);

          this.route.navigate(['/home']);
        },
        (error) => {
          if (error.error.message === 'Invalid email') {
            this.errorMessage = 'Email address not found';
          } else if (error.error.message === 'Invalid password') {
            this.errorMessage = 'Incorrect password';
          } else {
            this.errorMessage =
              'Unexpected error occurred. Please try again later.';
            console.error('Unexpected error occurred:', error);
          }
        }
      );
    }
  }
}
