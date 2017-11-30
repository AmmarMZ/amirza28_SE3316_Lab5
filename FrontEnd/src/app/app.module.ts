import { BrowserModule }      from '@angular/platform-browser';
import { NgModule }           from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';
import { AngularFireModule }  from 'angularfire2';

import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';
import { SampleService} from './sample/sample.service';
import { LoginAuthComponent } from './login-auth/login-auth.component';

import { AngularFireAuthModule } from 'angularfire2/auth';

import * as firebase from "firebase/app";
import { RegistrationPageComponent } from './registration-page/registration-page.component';

export const firebaseConfig = {
 apiKey: "AIzaSyATbZtWfXYtaIU0m-EhPY2xIOfLuKnOHb0",
    authDomain: "se3316-lab5.firebaseapp.com",
    databaseURL: "https://se3316-lab5.firebaseio.com",
    projectId: "se3316-lab5",
    storageBucket: "se3316-lab5.appspot.com",
    messagingSenderId: "184299949874"
};



@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    LoginAuthComponent,
    RegistrationPageComponent
  ],
  imports: 
  [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
    
  ],
  providers: [SampleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
