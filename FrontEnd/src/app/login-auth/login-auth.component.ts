// import { Component, OnInit } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
// import { Observable } from 'rxjs/Observable';

// @Component({
//   selector: 'app-login-auth',
//   templateUrl: './login-auth.component.html',
//   styleUrls: ['./login-auth.component.css']
// })
// export class LoginAuthComponent implements OnInit 
// {     
//   ngOnInit() {}
  
//   constructor(){}
  
//   onClick(user, pass)
//   {
//     var uName = user.value;
//     var pWord = pass.value;

//     user.value = "";
//     pass.value = "";
//   }
// }

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css'],
})
export class LoginAuthComponent {
    title = 'Angular Lab 5 - Ammar Mirza - 250846071';
    passCheck = true;
    regAccess = false;

  constructor(public afAuth: AngularFireAuth) {
  }
  login(name,pass) 
  {
    this.afAuth.auth.signInWithEmailAndPassword(name,pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error.code + " " + error.message);
    });
  }
  register(name,pass,pass2)
  {
    this.passCheck = false;
    
    if(this.regAccess)
    {
      if (pass === pass2)
      {
        this.afAuth.auth.createUserWithEmailAndPassword(name,pass).catch(function(error) 
        {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error.code + " " + error.message);
        });
      }
      else
      {
        alert("Passwords don't match");
      }
    }
    else{this.regAccess = true;}
    
  }
  logout() 
  {
    this.afAuth.auth.signOut();
    this.passCheck = true;
  }
}

