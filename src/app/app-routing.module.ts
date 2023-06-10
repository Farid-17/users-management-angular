import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users/form', component: HomeComponent },
  { path: 'users/form/:id', component: HomeComponent },
  { path: 'users', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  // declarations: [ HomeComponent ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
