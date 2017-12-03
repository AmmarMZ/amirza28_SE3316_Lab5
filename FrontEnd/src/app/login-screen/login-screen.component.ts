import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import * as $ from 'jquery';

import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';


import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class LoginScreenComponent implements OnInit {

    constructor(public afAuth: AngularFireAuth, private http : HttpClient, private db: AngularFireDatabase) 
    {   this.items = db.list('items').valueChanges();}
    items: Observable<any[]>;
    query;
    url;
    returnFile : any [] = []; //stores urls of query
    counter;
    fileSize;
    domCheck = true;
    count = 0;
    logout() 
  {
    this.afAuth.auth.signOut();
  }
  
  loadImage(queryIn)
  {
    if (queryIn == "")
    {
      return;
    }
    if (queryIn != this.query)
    { 
       this.domCheck = true;
       this.returnFile = [];
       
    }
    if (queryIn == this.query && this.count != 1)
    {
     this.domCheck = false; 
    }
    this.count++;
    if (this.domCheck)
    {
    this.url = "https://images-api.nasa.gov/search?media_type=image&q=";
    this.query = queryIn;
    this.url = this.url + this.query;
    this.http.get(this.url).subscribe(data =>
    {
         this.fileSize = data.collection.items.length;
         for(var i = 0; i < data.collection.items.length; i++) 
         {
            this.returnFile.push(data.collection.items[i].links[0].href);
         }
      });
    
    }
  }

  ngOnInit() 
  {
      
  }
  
  addToCollection(event)
  {
       var current = this.afAuth.auth.currentUser;
       var email = current.email;
       var key = email.replace('@','AT');
       key = key.replace('.','DOT');
       var collectionName = 'myFirstCollection/'
       this.db.list(key+'/public/'+collectionName).push(event);
       
 
  }
}
