import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrl: './users-create.component.css'
})
export class UsersCreateComponent {

  constructor(
    private formBuilder: FormBuilder,
    private readonly database: DatabaseService,
    private router: Router,
    private loadingService: LoaderService
  ) {}

  userForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: null
  });


  private Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  async createUser(): Promise<void> {
    
  }

  onSubmit(): void {
    this.loadingService.setLoading(true);
    this.database.addUser({ 
      firstName: this.userForm.value.firstName?.toString(),
      lastName: this.userForm.value.lastName?.toString(),
      email: this.userForm.value.email?.toString(),
      mobileNumber: this.userForm.value?.mobileNumber ?? undefined
    }).then((res) => {
      this.loadingService.setLoading(false);
      if (res) {
        this.Toast.fire({
          icon: 'success',
          title: 'User created correctly!',
        });
        this.router.navigate(['/']);
      }
      this.userForm.reset();
    }).catch((err) => {
      this.loadingService.setLoading(false);
      this.Toast.fire({
        icon: 'error',
        title: 'Error! User not created!',
      })
    });
  }
}
