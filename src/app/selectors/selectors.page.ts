import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {CSSGroup, CSSProp, CSSSelector, CSSSelectorObject} from '../models/css.model';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PropertyDetailPage} from '../property-detail/property-detail.page';
import {UtilityService} from '../utility.service';

@Component({
  selector: 'app-selectors',
  templateUrl: './selectors.page.html',
  styleUrls: ['./selectors.page.scss'],
})
export class SelectorsPage implements OnInit, OnDestroy {
  selectorData: CSSSelectorObject;
  selectorGroup: CSSGroup[] = [];
  destroySub$ = new Subject<void>();
  constructor(private service: AppService, private util: UtilityService) { }

  ngOnInit() {
    combineLatest([this.service.getCSSSelectors(), this.service.getCSSSelectorGroup()]).pipe(
        takeUntil(this.destroySub$)
    ).subscribe(([selectorData, groupData]) => {
      this.selectorData = selectorData;
      this.selectorGroup = groupData;
    });
  }
  openProperty(prop: CSSSelector): void{
    this.util.presentModal({
      component: PropertyDetailPage,
      cssClass: 'property-modal',
      componentProps: {
        property: prop,
        exampleData: prop,
        selector: true
      },
    });
  }
  ngOnDestroy() {
    this.destroySub$.next();
  }
}
