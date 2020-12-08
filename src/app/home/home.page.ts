import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CSSGroup, CSSObject} from '../models/css.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  cssData: CSSObject;
  cssGroup: CSSGroup[] = [];
  destroySub$ = new Subject<void>();
  constructor(private service: AppService) { }

  ngOnInit() {
    combineLatest([this.service.getCSSPropertiesData(), this.service.getCSSGroup()]).pipe(
        takeUntil(this.destroySub$)
    ).subscribe(([cssData, groupData]) => {
      this.cssData = cssData;
      this.cssGroup = groupData;
    });
  }
  ngOnDestroy() {
    this.destroySub$.next();
  }
}
