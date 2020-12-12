import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CSSExampleObject, CSSGroup, CSSObject, CSSProp} from '../models/css.model';
import {UtilityService} from '../utility.service';
import {PropertyDetailPage} from '../property-detail/property-detail.page';
import {FilterPopComponent} from '../filter-pop/filter-pop.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  cssData: CSSObject;
  exampleData: CSSExampleObject;
  cssGroup: CSSGroup[] = [];
  searchFlag = false;
  searchData: CSSProp[] = [];
  cssPropList: CSSProp[] = [];
  destroySub$ = new Subject<void>();
  showBar = false;
  filterValue: string;
  sortValue: string;
  constructor(private service: AppService, private util: UtilityService) { }

  ngOnInit() {
    combineLatest([
        this.service.getCSSPropertiesData(),
        this.service.getCSSGroup(),
        this.service.getCSSPropertiesExampleData()
    ]).pipe(
        takeUntil(this.destroySub$)
    ).subscribe(([cssData, groupData, exampleData]) => {
      this.cssData = cssData;
      this.cssGroup = groupData;
      this.exampleData = exampleData;
      this.cssPropList = Object.values(this.cssData);
    });
    combineLatest([this.service.filter, this.service.sort]).pipe(
        takeUntil(this.destroySub$)
    ).subscribe(([filter, sort]) => {
      this.filterValue = filter;
      this.sortValue = sort;
      this.filterList(filter, sort);
    });
  }
  openProperty(prop: CSSProp): void{
    this.util.presentModal({
      component: PropertyDetailPage,
      cssClass: 'property-modal',
      componentProps: {
        property: prop,
        cssData: this.cssData,
        exampleData: this.exampleData[prop.id]
      },
    });
  }
  search(): void {
    this.showBar = !this.showBar;
  }
  filter(ev): void {
    this.util.presentPopover({
      component: FilterPopComponent,
      cssClass: 'filter-pop',
      event: ev,
      translucent: true
    });
  }
  searchList(evt): void {
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      this.searchFlag = false;
      return;
    } else {
      this.searchFlag = true;
    }
    if (this.cssPropList.length > 0 && searchTerm) {
      this.searchData = this.cssPropList.filter(p => {
        return (p.prop + '').indexOf(searchTerm) !== -1;
      });
    }
  }
  filterList(filter, sort): void{
    if (!filter && !sort){
      this.searchFlag = false;
      return;
    }
    this.searchFlag = true;
    this.searchData = this.cssPropList;
    if (this.searchData.length > 0 && filter) {
      this.searchData = this.searchData.filter(p => {
        return p.css === filter;
      });
    }
    if (this.searchData.length > 0 && sort) {
      this.searchData = this.searchData.sort((a, b) => {
        if (a.prop > b.prop){
          return sort === 'asce' ? 1 : -1;
        }else if (a.prop < b.prop){
          return sort === 'asce' ? -1 : 1;
        }
        return 0;
      });
    }
  }
  resetFilter(): void{
    this.service.filter.next(undefined);
  }
  resetSort(): void{
    this.service.sort.next(undefined);
  }
  ngOnDestroy(): void {
    this.destroySub$.next();
  }
}
