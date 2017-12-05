import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import * as $ from 'jquery';

import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { ViewContainerRef} from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
   encapsulation: ViewEncapsulation.None
})

export class LoginScreenComponent implements OnInit {

    constructor(public afAuth: AngularFireAuth, private http : HttpClient, private db: AngularFireDatabase, private router : Router) 
    {  }
    items: Observable<any[]>;   
    query;      //the query
    url;        //get to nasa API
    returnFile : any [] = []; //stores urls of query
    fileSize;                   //lenght of images returned
    domCheck = false;            //bool to ensure query is good
    count = 0;                      //basically a shitty semaphore
    
    logout() 
    {
        this.afAuth.auth.signOut();
    }
  
  loadImage(queryIn)        //gets all images from the JSON after doing GET to NASA API
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
            this.returnFile.push(data.collection.items[i].links[0].href);       //send query and get the fruits
         }
      });
    
    }
  }

  ngOnInit() 
  {
      
  }
    
  addToCollection(event)            //adds img src to database
  {
       var current = this.afAuth.auth.currentUser;
       var email = current.email;
       var key = email.replace('@','AT');
       key = key.replace('.','DOT');
       var collectionName = 'myFirstCollection/';
       this.db.list(key+'/public/'+collectionName).push(event);
  }
  
  routeToCollections()      
  {
      
      this.router.navigate(['/collections']);
  }
  
  
 
  
 
}
