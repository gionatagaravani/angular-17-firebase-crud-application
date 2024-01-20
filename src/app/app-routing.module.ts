import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UsersCreateComponent } from './components/users-create/users-create.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
    { path: '', component: UsersListComponent },
    { path: 'create', component: UsersCreateComponent },
    // { path: 'edit/:id', component: ViewProductComponent }
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
