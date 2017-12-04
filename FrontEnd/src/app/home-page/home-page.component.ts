import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import * as $ from 'jquery';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit 
{
    
    constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private router : Router) 
  {
    
  
         
  }

  ngOnInit() {
  }
  
  
  loginAuth = true;
  public aboutHide = false;

   showLoginAuth()
   {
     this.loginAuth = false;
     this.aboutHide = true;
   }
   
   pubArray : any[] = [];
    pathArray : any[] = [];
    pubImgArray: any [] = [];
    path; 
   
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
        
  }

}
