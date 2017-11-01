import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import {RoutingModule} from './app.routing';
import {AuthGuard} from './guard/auth.guard';
import { StartComponent } from './component/start/start.component';
import {ConfirmGuard} from './guard/confirm.guard';
import {ConfirmComponent} from './component/confirm/confirm.component';
import {SignupService} from './service/signup.service';
import {LoginService} from './service/login.service';
import {HttpClient} from './http/http.client';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {ConfirmService} from './service/confirm.service';
import { ResetComponent } from './component/reset/reset.component';
import {ResetService} from "./service/reset.service";
import { MessagesComponent } from './component/messages/messages.component';
import {MessageService} from "./service/message.service";
import {UsernameValidator} from "./validator/username-validator";
import {RequestFactory} from "./factory/request-factory";
import {SignupStatus} from "./status/signup-status";
import {EmailValidator} from "./validator/email-validator";
import {PasswordValidator} from "./validator/password-validator";
import { SignupUsernameInputComponent } from './component/signup-username-input/signup-username-input.component';
import { InputInfoComponent } from './component/input-info/input-info.component';
import { SignupEmailInputComponent } from './component/signup-email-input/signup-email-input.component';
import {SignupPasswordInputComponent} from "./component/signup-password-input/signup-password-input.component";
import { SignupPasswordAgainInputComponent } from './component/signup-password-again-input/signup-password-again-input.component';
import { SignupButtonComponent } from './component/signup-button/signup-button.component';
import { WelcomeContentComponent } from './component/welcome-content/welcome-content.component';
import { LoginNavbarComponent } from './component/login-navbar/login-navbar.component';
import {LoginStatus} from "./status/login-status";
import {CredentialValidator} from "./validator/credential-validator";
import { NavbarLogoComponent } from './component/navbar-logo/navbar-logo.component';
import { ResetPopupComponent } from './component/reset-popup/reset-popup.component';
import {ResetStartStatus} from "./status/reset-start-status";
import { MenuNavbarComponent } from './component/menu-navbar/menu-navbar.component';
import { InfoNavbarComponent } from './component/info-navbar/info-navbar.component';
import {ResetStatus} from "./status/reset-status";
import {ResetCodeValidator} from "./validator/reset-code-validator";
import {ConfirmStatus} from "./status/confirm-status";
import {ConfirmCodeValidator} from "./validator/confirm-code-validator";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StartComponent,
    ConfirmComponent,
    ResetComponent,
    MessagesComponent,
    SignupUsernameInputComponent,
    InputInfoComponent,
    SignupEmailInputComponent,
    SignupPasswordInputComponent,
    SignupPasswordAgainInputComponent,
    SignupButtonComponent,
    WelcomeContentComponent,
    LoginNavbarComponent,
    NavbarLogoComponent,
    ResetPopupComponent,
    MenuNavbarComponent,
    InfoNavbarComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    ConfirmGuard,
    HttpClient,
    SignupService,
    LoginService,
    ResetService,
    MessageService,
    UsernameValidator,
    EmailValidator,
    CredentialValidator,
    PasswordValidator,
    RequestFactory,
    SignupStatus,
    LoginStatus,
    ResetStartStatus,
    ResetStatus,
    ResetCodeValidator,
    ConfirmService,
    ConfirmStatus,
    ConfirmCodeValidator
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
