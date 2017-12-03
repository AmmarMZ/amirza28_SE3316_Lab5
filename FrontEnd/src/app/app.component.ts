import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  loginAuth = true;
  public aboutHide = false;
   constructor(public afAuth: AngularFireAuth) {}
   showLoginAuth()
   {
     this.loginAuth = false;
     this.aboutHide = true;
   }
}
