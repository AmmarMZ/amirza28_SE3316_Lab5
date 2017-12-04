import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import * as $ from 'jquery';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';


@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private router : Router) { }

  ngOnInit() {
  }
  
    
  createNewCollection(event)
  {
      var privacy;
      if($('#public').is(':checked'))
      {
        privacy = "/public/";
      }
      if ($('#private').is(':checked'))
      {
        privacy = "/private/";
      }
      
      
       var current = this.afAuth.auth.currentUser;
       var email = current.email;
       var key = email.replace('@','AT');
       key = key.replace('.','DOT');
       var collectionName = event;
      // this.db.object(key+ privacy +collectionName).set("");
       
       
   
   this.db.object(key+ privacy +collectionName).set(event);
  }

}
