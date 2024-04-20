import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
// Custom validator function for email format
function emailValidator() {
  return (control: { value: string }) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (control.value && !emailRegex.test(control.value)) {
      return { invalidEmail: true };
    }

    return null;
  };
}

function usernameValidator() {
  return (control: { value: string }) => {
    const usernameRegex = /^[a-zA-Z ]*$/;

    if (control.value && !usernameRegex.test(control.value)) {
      return { invalidUsername: true };
    }

    return null;
  };
}

function passwordValidator() {
  return (control: AbstractControl) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

    if (control.value && !passwordRegex.test(control.value)) {
      let errors: any = {}; // Explicitly declare errors as any

      // Check each criteria individually and set error message accordingly
      if (!/(?=.*[a-z])/.test(control.value)) {
        errors['missingLowercase'] = true;
      }
      if (!/(?=.*[A-Z])/.test(control.value)) {
        errors['missingUppercase'] = true;
      }
      if (!/(?=.*\d)/.test(control.value)) {
        errors['missingNumber'] = true;
      }
      if (!/(?=.*[@$!%*?&])/.test(control.value)) {
        errors['missingSpecialCharacter'] = true;
      }
      if (control.value.length < 8) {
        errors['minLength'] = true;
      }
      if (control.value.length > 12) {
        errors['maxLength'] = true;
      }

      return errors;
    }

    return null;
  };
}

import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private service: ApiserviceService,

    //formBuilder creates an instance of FormGroup & formControl
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    //formBuilder creates an instance of FormGroup & formControl
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, usernameValidator()]],
      email: ['', [Validators.required, emailValidator()]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          passwordValidator(),
        ],
      ],
    });
  }

  submit() {
    // Mark all form controls as touched to trigger error messages
    Object.values(this.form.controls).forEach((control) =>
      control.markAsTouched()
    );

    if (this.form.invalid) {
      // Form is not valid, show a generic message
      alert('Please enter valid details.');
      return;
    }

    const formData = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    };

    console.log('Form Data:', formData);

    this.http.post('http://localhost:3000/register', formData).subscribe(
      () => {
        console.log('Submit button clicked and HTTP request successful.');
        console.log('Submitted Form Data:', formData);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error submitting form:', error);

        // Handle specific error messages
        if (error.status === 409) {
          this.form.get('email')?.setErrors({ emailExists: true });
        } else {
          this.form.setErrors({ serverError: true });
          alert('Registration failed. Please try again later.');
        }
      }
    );
  }
}
