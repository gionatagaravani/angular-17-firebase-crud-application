import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Angular 17 - Firebase CRUD';

  constructor(private readonly database: DatabaseService) {}

  ngOnInit(): void {
    this.database.getAllUsers().subscribe((data) => console.log(data))
  }
}
