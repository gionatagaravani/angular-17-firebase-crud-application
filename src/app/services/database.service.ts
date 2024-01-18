import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, listVal, push, remove, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private database: Database){}

  private db = getDatabase();
  private userRef = ref(this.db, 'users/');

  getAllUsers(): Observable<User[]> {
    return listVal<User>(this.userRef);
  }

  addUser(data: User): void {
    push(this.userRef, data).catch((err)=> console.error(err));
  }

  removeUser(data: User): void {
    remove(ref(this.db, 'users/' + data.$key)).catch((err)=> console.error(err));
  }

  updateUser(data: User): void {
    update(ref(this.db, 'users/' + data.$key), data).catch((err)=> console.error(err));
  }
}
