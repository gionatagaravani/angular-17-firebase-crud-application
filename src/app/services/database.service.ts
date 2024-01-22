import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, listVal, push, remove, update, list, objectVal, object } from '@angular/fire/database';
import { Observable, retry } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private readonly database: Database){}

  private db = getDatabase();
  private userRef = ref(this.db, 'users/');

  getAllUsers(): Observable<any> {
    return object(this.userRef);
  }

  async addUser(data: User): Promise<boolean> {
    let res = false;
    await push(this.userRef, data)
      .catch((err) => {
        return false;
      })
      .finally(() => {
        res = true;
      });
    return res;
  }

  async removeUser(data: User): Promise<boolean> {
    let res = false;
    await remove(ref(this.db, 'users/' + data.$key))
    .catch((err) => {
      return false;
    })
    .finally(() => {
      res = true;
    });
    return res;
  }

  updateUser(data: User): void {
    update(ref(this.db, 'users/' + data.$key), data).catch((err)=> console.error(err));
  }
}
