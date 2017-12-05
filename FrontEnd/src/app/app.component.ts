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

    //abandonded constructor no longer needed, all variables above and below no longer needed for this section
   constructor(public afAuth: AngularFireAuth) {}
   showLoginAuth()
   {
     this.loginAuth = false;
     this.aboutHide = true;
   }
}
