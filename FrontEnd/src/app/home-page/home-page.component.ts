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
   tempArray : any [] = [];
    pathArray : any[] = [];
    pubImgArray: any [] = [];
    ratingArray: any [] = [];
    path; 
   
   getPublicCollections() //get all public collections for all users and their paths
  {
        var json2;
        var rating = 0;
        var obj2 = this.db.object('/');
        var size;
        obj2.snapshotChanges().subscribe(action => 
        {
        this.pubArray = [];
        this.pathArray = [];
        this.ratingArray = [];
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
                      var item3 = item2[key3];
                      
                      for(var key4 in item3)
                      {
                        if (key4 == "name")
                        {
                          this.pubArray.push(item3[key4]);
                        }
                        else if (key4 == "rating")
                        {
                          rating = 0;
                          var item4 = item3[key4];
                          for (var i in item4)
                          {
                            var temp = item4[i];
                            rating = rating + parseInt(temp);
                            size = Object.keys(item4).length;
                          }
                          var x = rating/size;
                          
                          this.ratingArray.push(x);
                        }
                      }
                      this.pathArray.push(key+"/" + key2 + "/" + key3);
                    }
                  } 
                }
              }
              
            }
        });
      
  }
  
   loadCollection(item) //loads images from a users public collection
  {
   
    var length = this.ratingArray.length;
    for (var i = 0; i < length - 1; i++) 
    {
        var min = i;
        for (var j = i + 1; j < length; j++)
        { 
            if (this.ratingArray[j] > this.ratingArray[min]) 
            {
                min = j; 
            }
        }
        if (min != i)
        {
            var tmp = this.ratingArray[i];
            var tmp2 = this.pubArray[i];
            var tmp3 = this.pathArray[i];
            
            
            this.ratingArray[i] = this.ratingArray[min];
            this.pubArray[i] = this.pubArray[min];
            this.pathArray[i] = this.pathArray[min];
            
            this.ratingArray[min] = tmp;
            this.pubArray[min] = tmp2;
            this.pathArray[min] = tmp3;
        }
    }
    
    for (var i in this.pubArray)
    {
      if (i >= 10)
      {
        this.pubArray.splice(i);
      }
    }

    
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
