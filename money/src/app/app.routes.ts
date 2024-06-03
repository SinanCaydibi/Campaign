import { Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { CreateCampComponent } from './dashboard/create-camp/create-camp.component';
import { ListCampComponent } from './dashboard/list-camp/list-camp.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'createCamp', component: CreateCampComponent },
      { path: 'listCamp', component: ListCampComponent },
    ],
  },
];
