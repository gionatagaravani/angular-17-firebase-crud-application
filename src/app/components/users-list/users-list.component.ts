import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  users: User[] = [];

  constructor(private readonly database: DatabaseService) {}

  ngOnInit(): void {
    // this.database.addUser({ lastName: 'weew', email: 'ssdsd', firstName: 'aaaa', mobileNumber: 12344563 });
    this.fetchUsersData();
  }

  fetchUsersData(): void {
    this.database.getAllUsers().subscribe((data) => {
      let users: User[] = [];
      data.snapshot.forEach((childSnapshot: { key: string; val: () => User; }) => {
        const user = childSnapshot.val();
        user.$key = childSnapshot.key;
        users.push(user);
      });
      this.users = users;
    })
  }
}
