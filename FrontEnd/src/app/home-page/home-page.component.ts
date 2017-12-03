import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit 
{

  ngOnInit() {
  }
  
  
  loginAuth = true;
  public aboutHide = false;
   constructor() {}
   showLoginAuth()
   {
     this.loginAuth = false;
     this.aboutHide = true;
   }

}
