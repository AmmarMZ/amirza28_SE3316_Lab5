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
  constructor(private db: AngularFireDatabase,public afAuth: AngularFireAuth, el: ElementRef)
  {
      this.el = el; 
  }
  
   
  collectionLinks : any [] = [];
  collectionLinks2: any [] = [];
  collectionLinks3: any [] = [];
  tempArray: any [] = [];
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
          json = action.payload.val();
            for (var key in json) 
            {
              this.collectionLinks.push(key);
            }
        });
        
        var json2;
        var obj2 = this.db.object(key+'/private/');
        obj2.snapshotChanges().subscribe(action => 
        {
          this.collectionLinks2 = [];
          json2 = action.payload.val();
            for (var key in json2) 
            {
              this.collectionLinks2.push(key);
            }
        });
        
        this.collectionLinks3 = [];
        for (var i in this.collectionLinks)
        {
          this.collectionLinks3.push(this.collectionLinks[i]);
        }
        
        for (var i in this.collectionLinks2)
        {
          this.collectionLinks3.push(this.collectionLinks2[i]);
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
      
      
      
      
        var json;
        var obj = this.db.object(mainKey+'/public/');
        obj.snapshotChanges().subscribe(action => 
        {
          this.tempArray = [];
          json = action.payload.val();
          var check = false;
            for (var key in json) 
            {
              if(key == collectionName)
              {
                check = true;
              }
            }
            if (check)
            {this.db.list(mainKey + '/public/' + collectionName).push(id);}
                
        });
        
        var json2;
        var obj2 = this.db.object(mainKey+'/private/');
        obj2.snapshotChanges().subscribe(action => 
        {
         this.tempArray = [];
          json2 = action.payload.val();
          var check = false;
            for (var key in json2) 
            {
              if(key == collectionName)
              {
                check = true;
                
              }
            }
            if (check)
            {
              this.db.list(mainKey + '/private/' + collectionName).push(id);
            }
                
        });
  }
}

