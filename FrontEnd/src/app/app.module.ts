import { BrowserModule }      from '@angular/platform-browser';
import { NgModule }           from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';
import { AngularFireModule }  from 'angularfire2';
import { ModalModule } from 'angular2-modal';

import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';
import { SampleService} from './sample/sample.service';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { CollectionsComponent }   from './collections/collections.component'

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';



import * as firebase from "firebase/app";
import { LoginScreenComponent } from './login-screen/login-screen.component';

import { RouterModule, Routes } from '@angular/router';
import { PopupComponent } from './popup/popup.component';

export const firebaseConfig = {
 apiKey: "AIzaSyATbZtWfXYtaIU0m-EhPY2xIOfLuKnOHb0",
    authDomain: "se3316-lab5.firebaseapp.com",
    databaseURL: "https://se3316-lab5.firebaseio.com",
    projectId: "se3316-lab5",
    storageBucket: "se3316-lab5.appspot.com",
    messagingSenderId: "184299949874"
};

const appRoutes: Routes = [
  { path:   'login',          component: LoginAuthComponent },
  { path:   'homeScreen',     component: LoginScreenComponent},
  { path:   '',               component: HomePageComponent },
  { path:   'collections',    component: CollectionsComponent },
  { path:   '**',             component: ErrorNotFoundComponent},

  
  ];


@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    LoginAuthComponent,
    LoginScreenComponent,
    HomePageComponent,
    ErrorNotFoundComponent,
    CollectionsComponent,
    PopupComponent
  ],
  imports: 
  [
     RouterModule.forRoot(
      appRoutes
    ),
    ModalModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    
    
  ],
  providers: [SampleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
