import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ModalModule } from 'ng2-modal'
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ElementRef } from '@angular/core';



@Component({
  selector: 'app-modal',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit 
{
  ngOnInit() 
  {}
   el: ElementRef;  //not sure what used for but don't want to delete for fear of errors
   item: Observable<any>; //see above comment
  constructor(private db: AngularFireDatabase,public afAuth: AngularFireAuth, el: ElementRef)
  {
      this.el = el; //pretty sure its useless
  }
  
   
  collectionLinks : any [] = [];  //gets references of all public collections
  collectionLinks2: any [] = [];  //gets references of all private collections
  collectionLinks3: any [] = [];  //adds above 2 together
  privArray : any [] = [];        //gets number of public collections
  privArray2 : any [] = [];       //gets number of private collections
  privArray3 : any [] = [];       //adds above 2 together
  dbName : any [] = [];           //gets database key for public collections
  dbName2: any [] = [];           //gets database key for private collections
  dbName3: any [] = [];           //adds above 2 together
 
  collectionsExist = true;        //var to determine if user has any collections or not

  loadFromDb()        //loads all users collections when they want to add pic to their db
  {
    
    var current = this.afAuth.auth.currentUser;
    var email = current.email;
    var key = email.replace('@','AT');
    key = key.replace('.','DOT');         //get user

        var json;
        var obj = this.db.object(key+'/public/');   //access db, async task
        obj.snapshotChanges().subscribe(action => 
        {
          this.collectionLinks = [];
          this.privArray = [];
          this.dbName = [];
          json = action.payload.val();
            for (var key in json) 
            {
              var temp = json[key];
              for (var key2 in temp)
              {
                if (key2 == 'name')
                {
                  this.dbName.push(key);
                  this.collectionLinks.push(temp[key2]);        //add everything to the arrays
                  this.privArray.push('/public/')
                }
              }
              // this.collectionLinks.push(key);
              // this.privArray.push('/public/')
            }
        });
        
        var json2;                                    //do the same thing as above and get all the private collections
        var obj2 = this.db.object(key+'/private/');
        obj2.snapshotChanges().subscribe(action => 
        {
          this.collectionLinks2 = [];
          this.privArray2 = [];
          this.dbName2 = [];
          json2 = action.payload.val();
            for (var key in json2) 
            {
             var temp = json2[key];
             for(var key2 in temp)
             {
               if (key2 == 'name')
               {
                 this.dbName2.push(key);
                this.collectionLinks2.push(temp[key2]);
                this.privArray2.push('/private/')
               }
             }
              // this.collectionLinks2.push(key);
              // this.privArray2.push('/private/')
            }
        });
        
        this.collectionLinks3 = [];           //add everything into one array for easy traversal
        this.privArray3 = [];
        this.dbName3 = [];
        for (var i in this.collectionLinks)
        {
          this.collectionLinks3.push(this.collectionLinks[i]);
          this.privArray3.push(this.privArray[i]);
          this.dbName3.push(this.dbName[i]);
        }
        
        for (var i in this.collectionLinks2)
        {
          this.collectionLinks3.push(this.collectionLinks2[i]);
          this.privArray3.push(this.privArray2[i]);
          this.dbName3.push(this.dbName2[i]);
        }
        

        

  
  }
  
  onClick(event, collectionName)    //called when adding specific pic to array
  {
      var target = event.currentTarget;
      var parent = $(target).parent().parent().parent().parent().parent().parent().parent().parent(); //get src of image from great great grandmother
      var id = parent.attr('id');
      var current = this.afAuth.auth.currentUser;
      var email = current.email;
      var key = email.replace('@','AT');
      var mainKey = key.replace('.','DOT');
      var privacy;
      var dbName;
      
      for ( var i in this.collectionLinks3)         //setting the path correctly to the db
      {
        if (collectionName == this.collectionLinks3[i])
        {
          privacy = this.privArray3[i];
          dbName = this.dbName3[i];
        }
      }
      this.db.list(mainKey + privacy + dbName).push(id);    //push to db
      
     
      
        
        
  }
}

