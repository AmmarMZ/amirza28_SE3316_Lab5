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
  el: ElementRef;
   item: Observable<any>;
  constructor(private db: AngularFireDatabase,public afAuth: AngularFireAuth, el: ElementRef)
  {
      this.el = el; 
     
  }
  
   
  collectionLinks : any [] = [];
  collectionLinks2: any [] = [];
  collectionLinks3: any [] = [];
  privArray : any [] = [];
  privArray2 : any [] = [];
  privArray3 : any [] = [];
  dbName : any [] = [];
  dbName2: any [] = [];
  dbName3: any [] = [];
 
  collectionsExist = true;

  loadFromDb()
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
                  this.collectionLinks.push(temp[key2]);
                  this.privArray.push('/public/')
                }
              }
              // this.collectionLinks.push(key);
              // this.privArray.push('/public/')
            }
        });
        
        var json2;
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
        
        this.collectionLinks3 = [];
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
        

        
      // for (var key in json) 
      // {
      //       var item = json[key];
           
      //       for (var key2 in item)
      //       {
      //         alert(item[key2]);
      //       }
      //     }
  
  }
  
  onClick(event, collectionName)
  {
    
      var target = event.currentTarget;
      var parent = $(target).parent().parent().parent().parent().parent().parent().parent().parent();
      var id = parent.attr('id');
      var current = this.afAuth.auth.currentUser;
      var email = current.email;
      var key = email.replace('@','AT');
      var mainKey = key.replace('.','DOT');
      var privacy;
      var dbName;
      
      for ( var i in this.collectionLinks3)
      {
        if (collectionName == this.collectionLinks3[i])
        {
          privacy = this.privArray3[i];
          dbName = this.dbName3[i];
        }
      }
      this.db.list(mainKey + privacy + dbName).push(id);
      
     
      
        
        
  }
}

