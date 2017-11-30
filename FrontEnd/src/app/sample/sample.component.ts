import { Component, OnInit }  from '@angular/core';
import {SampleService}        from './sample.service'

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit 
{
  response = "My name Borat, very nice!"
  
  constructor(private _sampleService: SampleService) { }

  ngOnInit() {}
  
  onClick()
  {
    //this.response = "But sometimes they call me Steve!"
    this._sampleService.getData(this.onResponse.bind(this));
  }
  
  onResponse(res : string)
  {
    this.response = res;
  }

}
