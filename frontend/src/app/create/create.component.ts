import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  errormsg: string | null = null;
  successmsg: string | null = null;
  getparamid: any;
  initialValues: any = {};
  userForm: FormGroup;

  constructor(
    private service: ApiserviceService,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.userForm = new FormGroup({
      task_name: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50),
      ]),
      task_details: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please Login First!');
      this.route.navigate(['/login']);
    }
    if (this.getparamid) {
      this.service.getSingleData(this.getparamid).subscribe(
        (res) => {
          if (res.data && res.data.length > 0) {
            this.initialValues = {
              task_name: res.data[0].task_name,
              task_details: res.data[0].task_details,
            };
            this.userForm.patchValue(this.initialValues);
          } else {
            alert('No data found for the provided ID.');
            this.route.navigate(['/home']);
          }
        },
        (error) => {
          alert('No data found or error retrieving data.');
          this.route.navigate(['/home']);
        }
      );
    }
  }

  userSubmit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please Login First!');
      window.location.href = '/login';
      return;
    }

    if (this.userForm.valid) {
      this.service.createData(this.userForm.value).subscribe(
        (res) => {
          this.userForm.reset();
          this.successmsg = res.message;
          this.errormsg = null;
          this.route.navigate(['/home']);
        },
        (error) => {
          this.successmsg = null;
          if (error.status === 401) {
            this.route.navigate(['/login']);
          } else {
            this.errormsg = 'Data not Inserted. Please try again later.';
          }
        }
      );
    }
  }

  userUpdate(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please Login First!');
      window.location.href = '/login';
      return;
    }

    if (this.userForm.valid) {
      const changes: string[] = [];
      if (this.userForm.value.task_name !== this.initialValues.task_name) {
        changes.push('Task Name');
      }
      if (
        this.userForm.value.task_details !== this.initialValues.task_details
      ) {
        changes.push('Task Details');
      }

      if (changes.length > 0) {
        this.service.updateData(this.userForm.value, this.getparamid).subscribe(
          (res) => {
            this.successmsg = `Updated successfully. Changes: ${changes.join(
              ', '
            )}.`;
            this.errormsg = null;
          },
          (error) => {
            this.handleUpdateError(error);
          }
        );
      } else {
        this.successmsg = null;
        this.errormsg = 'No changes were detected. No update was performed.';
      }
    } else {
      this.errormsg = 'Invalid Form Data. Please check the form fields.';
    }
  }

  closeErrorAlert(): void {
    this.errormsg = null;
  }

  closeSuccessAlert(): void {
    this.successmsg = null;
  }

  private handleUpdateError(error: any): void {
    this.successmsg = null;
    if (error.status === 401) {
      this.route.navigate(['/login']);
    } else if (error.status === 404) {
      this.errormsg = 'User not found. Please check the provided ID.';
    } else {
      this.errormsg = 'Data not Updated. Please try again later.';
    }
  }
}
