import { ConfigurationComponent } from './configuration/configuration.component';
import { LoginGuardService } from './login/login-guard.service';
import { LoginComponent } from './login/login.component';
import { MailingFormComponent } from './mailing/mailing-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {path: 'mailing', component: MailingFormComponent, canActivate: [LoginGuardService]},
    {path: 'configuration', component: ConfigurationComponent, canActivate: [LoginGuardService]},
    {path: '', component: LoginComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
