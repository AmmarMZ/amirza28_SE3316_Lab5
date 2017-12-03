
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import * as $ from 'jquery';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css'],
})
export class LoginAuthComponent 
{

    title = 'Angular Lab 5 - Ammar Mirza - 250846071';
    passCheck = true;
    regAccess = false;
    routerVar = false;
    routeCheck = true;

  constructor(public afAuth: AngularFireAuth, private router : Router)
  {
  }
  login(name,pass)
  {
    this.routeCheck = true;
    this.afAuth.auth.signInWithEmailAndPassword(name,pass).catch(function(error) 
    {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error.code + " " + error.message);
        this.routeCheck = false;
        
    }).then
    (
        (success) => 
        {
           if (this.routeCheck)
          {
            this.router.navigate(['/homeScreen']);
          }
        

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
            
        }).then(
        (success) => {
           let user:any = firebase.auth().currentUser;
           user.sendEmailVerification().then(
             (success) => {console.log("please verify your email")} 
           ).catch(
             (err) => {
               this.error = err;
             }
           )

        }).catch(
          (err) => {
            this.error = err;
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
  }
  
  routeToHS()
  {
    this.router.navigate(['/homeScreen']);
  }
 
}

