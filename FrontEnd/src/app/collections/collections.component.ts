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

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private router : Router) 
  {
    
  
         
  }

  ngOnInit()
  {
   
  }
  
  collectionLinks : any [] = [];
  collectionLinks2: any [] = [];
  collectionLinks3: any [] = [];
  privArray : any [] = [];
  privArray2 : any [] = [];
  privArray3 : any [] = [];
   imgArray : any [] = [];  //for user
   pubArray : any [] = [];  //public collection
   pathArray : any [] = []; //path of public collections
   pubImgArray: any [] = [];  //srcs of public collections
   path; // used for current colletion path
  hideRating = true;
  collectionsExist = true;

  createNewCollection(event) //creates new collection
  {
      var check = true;
      var privacy;
      if($('#public').is(':checked'))
      {
        privacy = "/public/";
      }
      if ($('#private').is(':checked'))
      {
        privacy = "/private/";
      }
      
      if ($('#private').is(':checked') && $('#public').is(':checked'))
      {
        alert("Both checkboxes can't be checked");
        check = false;
      }
      if (!$('#private').is(':checked') && !$('#public').is(':checked'))
      {
        alert("One checkbox must be checked");
        check = false;
      }
      if ($('#collectionName').val.length == 0)
      {
        alert("No name inputted");
        check = false;
      }
      
      if (check)
      {
         var current = this.afAuth.auth.currentUser;
         var email = current.email;
         var key = email.replace('@','AT');
         key = key.replace('.','DOT');
         var collectionName = event; 
        this.db.object(key+ privacy +collectionName).set(event);
        alert("succesfully created collection");
        
      }
  }
  
  loadFromDb() //for loading current users collections
  {
    
    var current = this.afAuth.auth.currentUser;
    var email = current.email;
    var key = email.replace('@','AT');
    key = key.replace('.','DOT');

        var json;
        var obj = this.db.object(key+'/public/');
        obj.snapshotChanges().subscribe(action => 
        {
          this.collectionLinks = [];
          this.privArray = [];
          json = action.payload.val();
            for (var key in json) 
            {
              this.collectionLinks.push(key);
              this.privArray.push('/public/')
            }
        });
        
        var json2;
        var obj2 = this.db.object(key+'/private/');
        obj2.snapshotChanges().subscribe(action => 
        {
          this.collectionLinks2 = [];
          this.privArray2 = [];
          json2 = action.payload.val();
            for (var key in json2) 
            {
              this.collectionLinks2.push(key);
              this.privArray2.push('/private/')
            }
        });
        
        this.collectionLinks3 = [];
        this.privArray3 = [];
        for (var i in this.collectionLinks)
        {
          this.collectionLinks3.push(this.collectionLinks[i]);
          this.privArray3.push(this.privArray[i]);
        }
        
        for (var i in this.collectionLinks2)
        {
          this.collectionLinks3.push(this.collectionLinks2[i]);
          this.privArray3.push(this.privArray2[i]);
        }
        
  }
  
  getGallery(item) //gets images for current user
  {
    
    var current = this.afAuth.auth.currentUser;
    var email = current.email;
    var key = email.replace('@','AT');
    key = key.replace('.','DOT');
    var privacy;
    
    
    for (var i in this.collectionLinks3)
    {
      if (item == this.collectionLinks3[i])
      {
        privacy = this.privArray3[i];
      }
    }
    
        var json2;
        this.imgArray = [];
        var obj2 = this.db.object(key+privacy + item);
        obj2.snapshotChanges().subscribe(action => 
        {
    
          json2 = action.payload.val();
            for (var key in json2) 
            {
              this.imgArray.push(json2[key]);
              
            }
        });
  }
  
  getPublicCollections() //get all public collections for all users and their paths
  {
        var json2;
        
        var obj2 = this.db.object('/');
        obj2.snapshotChanges().subscribe(action => 
        {
          this.pubArray = [];
        this.pathArray = [];
            json2 = action.payload.val();
            for (var key in json2) 
            {
              var item = json2[key];
              for (var key2 in item)
              {
                if (key2 == 'public')
                {
                  var item2 = item[key2];
                  {
                    for (var key3 in item2)
                    {
                      this.pathArray.push(key+"/" + key2 + "/" + key3);
                      this.pubArray.push(key3);
                    }
                  } 
                }
              }
              
            }
        });
      
  }
  
  loadCollection(item) //loads images from a users public collection
  {
    
    for (var i in this.pubArray)
    {
      if (item == this.pubArray[i])
      {
        this.path = this.pathArray[i]; 
      }
    }
    
       var json2;
        
        var obj2 = this.db.object(this.path);
        obj2.snapshotChanges().subscribe(action => 
        {
          this.pubImgArray = [];
          json2 = action.payload.val();
            for (var key in json2) 
            {
              this.pubImgArray.push(json2[key]);
            }
        });
        
        this.hideRating = false;
  }
  
  rate(rating)
  {
    var check = true;
    if (rating.length == 0 || rating.length > 2)
    {
      alert('invalid rating');
      check = false;
    }
    if(rating < 0 || rating > 10)
    {
      check = false;
      alert('invalid rating');
    }
    if (check)
    {
      var current = this.afAuth.auth.currentUser;
      var email = current.email;
      var key = email.replace('@','AT');
      key = key.replace('.','DOT');
      this.db.object(this.path + '/rating/' + key + '-rating:' ).set(rating);
    }
  }
     
}
