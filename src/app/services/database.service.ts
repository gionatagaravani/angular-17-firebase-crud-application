import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, onValue, set, object, listVal } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private database: Database){}

  private db = getDatabase();

  getAllUsers(): Observable<User[]> {
    return listVal<User>(ref(this.db, 'users/'));
  }

  writeUserData(userId: string, name: string, email: string): void {
    
    set(ref(this.db, 'users/' + userId), {
      username: name,
      email: email
    }).catch((err)=> console.error(err));
  }
}
