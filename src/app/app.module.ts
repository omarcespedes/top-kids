import { ConfirmPaymentDialog } from './base/components/dialog/confirm-payment.component';
import { ConfigurationModule } from './configuration/configuration.module';
import { DeleteDialog } from './base/components/dialog/dialog-delete.component';
import { MailDialog } from './base/components/dialog/dialog-mail.component';
import { LoginGuardService } from './login/login-guard.service';
import { LoginService } from './login/login.service';
import { LoginModule } from './login/login.module';
import { MailingModule } from './mailing/mailing.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ComponentsModule } from './base/components/components.module';
import { GroupsModule } from './groups/groups.module';
import { BaseService } from './base/base.service';
import { MissModule } from './miss/miss.module';
import { KidModule } from './kid/kid.module';
import { AppRoutingModule } from './app-route.module';
import { MainComponentsModule } from './main/main-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MatNativeDateModule } from '@angular/material';
import { UserService } from 'app/main/user.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ComponentsModule,
    PurchaseModule,
    ConfigurationModule,
    MainComponentsModule,
    MissModule,
    KidModule,
    LoginModule,
    GroupsModule,
    MailingModule,
    AppRoutingModule
  ],
  providers: [
    BaseService,
    LoginService,
    UserService,
    LoginGuardService
  ],
  entryComponents: [
        MailDialog,
        DeleteDialog,
        ConfirmPaymentDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
