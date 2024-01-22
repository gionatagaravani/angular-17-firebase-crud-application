import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { User } from '../../models/user.model';
import { of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent implements OnInit {

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

  private key: string = '';

  constructor(private formBuilder: FormBuilder, private readonly database: DatabaseService, private route: ActivatedRoute) {}

  userForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: undefined
  });

  ngOnInit() {
    this.fetchUsersData();
  
  }

  fetchUsersData(): void {
    this.key = this.route.snapshot.params['id'];
    if (this.key) {
      this.database.getUserById(this.key).subscribe((data) => {
        this.userForm.setValue(data.snapshot.val());
      });
    }
  }


  onSubmit(): void {
    this.database.updateUser({ 
      firstName: this.userForm.value.firstName?.toString(),
      lastName: this.userForm.value.lastName?.toString(),
      email: this.userForm.value.email?.toString(),
      mobileNumber: Number(this.userForm.value?.mobileNumber)
    }, this.key).then((res) => {
      if (res) {
        this.Toast.fire({
          icon: 'success',
          title: 'User updated correctly!',
        });
      }
    }).catch((err) => {
      console.error(err)
      this.Toast.fire({
        icon: 'error',
        title: 'Error! User not updated!',
      })
    });
  }
  
}
