import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {take} from 'rxjs/operators';
import {FlexModel, FlexObject} from '../models/flex.model';
import {UtilityService} from '../utility.service';

@Component({
  selector: 'app-flexbox',
  templateUrl: './flexbox.page.html',
  styleUrls: ['./flexbox.page.scss'],
})
export class FlexboxPage implements OnInit {
  flexData: FlexObject;
  flexType = 'container';
  selectedFlexType: FlexModel[];
  constructor(private service: AppService, public util: UtilityService) { }

  ngOnInit() {
    this.service.getCSSFlexbox().pipe(take(1)).subscribe((flexData) => {
      console.log(flexData);
      this.flexData = flexData;
      this.selectedFlexType = this.flexData.flexContainer;
    });
  }
  generateCSS(code: string): string{
    return this.util.generateCSS(code);
  }
  onTypeChange(e: string){
    if (e === 'container'){
      this.selectedFlexType = this.flexData.flexContainer;
    }else{
      this.selectedFlexType = this.flexData.flexItem;
    }
  }
}
