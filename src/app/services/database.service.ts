import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, listVal, push, remove, update, list, objectVal, object, get, child, fromRef } from '@angular/fire/database';
import { Observable, of, retry } from 'rxjs';
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

  getUserById(key: string): Observable<any> {
    return object(ref(this.db, `users/${key}`));
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

  async updateUser(data: User, id: string): Promise<boolean> {
    let res = false;
    await update(ref(this.db, 'users/' + id), data)
    .catch((err) => {
      return false;
    })
    .finally(() => {
      res = true;
    });
    return res;
  }
}
