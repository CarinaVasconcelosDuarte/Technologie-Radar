import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';
import { LoggedInComponent } from './loggedin.layout.component';
import { LoggedOutComponent } from './loggedout.layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoggedInComponent, canActivate: [AuthGuard], children:[
    { path: '', component: DashboardComponent },
    { path: 'details', component: DetailsComponent },
    { path: 'details/:id', component: DetailsComponent }
  ]},
  { path: '', component: LoggedOutComponent, children: [
    { path: 'login', component: LoginComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation : 'reload'})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
