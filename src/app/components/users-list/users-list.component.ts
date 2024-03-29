import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

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

  users: User[] = [];

  constructor(private readonly database: DatabaseService, private loadingService: LoaderService) {}

  ngOnInit(): void {
    this.fetchUsersData();
  }

  fetchUsersData(): void {
    this.loadingService.setLoading(true);
    this.database.getAllUsers().subscribe((data) => {
      let users: User[] = [];
      data.snapshot.forEach((childSnapshot: { key: string; val: () => User; }) => {
        const user = childSnapshot.val();
        user.$key = childSnapshot.key;
        users.push(user);
      });
      this.users = users;
      this.loadingService.setLoading(false);
    })
  }

  deleteUser(key: any): void {
    const user = this.users.find((u) => (u.$key === key));
    if(user) {

      Swal.fire({
        title: `Are you sure to remove ${user.firstName} ${user.lastName}?`,
        showConfirmButton: false,
        showCancelButton: true,
        showDenyButton: true,
        denyButtonText: "Yes",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isDenied) {
          this.loadingService.setLoading(true);
          this.database.removeUser(user).then((res) => {
            this.loadingService.setLoading(false);
            if (res) {
              this.Toast.fire({
                icon: 'success',
                title: 'User deleted correctly!',
              });
            }
          }).catch((err)=>{
            console.error(err);
            this.loadingService.setLoading(false);
            this.Toast.fire({
              icon: 'error',
              title: 'Error! User not deleted!',
            })
            
          })
        }
      });
    }
  }
}
