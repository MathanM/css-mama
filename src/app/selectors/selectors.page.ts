import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {CSSGroup, CSSSelectorObject} from '../models/css.model';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-selectors',
  templateUrl: './selectors.page.html',
  styleUrls: ['./selectors.page.scss'],
})
export class SelectorsPage implements OnInit, OnDestroy {
  selectorData: CSSSelectorObject;
  selectorGroup: CSSGroup[] = [];
  destroySub$ = new Subject<void>();
  constructor(private service: AppService) { }

  ngOnInit() {
    combineLatest([this.service.getCSSSelectors(), this.service.getCSSSelectorGroup()]).pipe(
        takeUntil(this.destroySub$)
    ).subscribe(([selectorData, groupData]) => {
      this.selectorData = selectorData;
      this.selectorGroup = groupData;
    });
  }
  ngOnDestroy() {
    this.destroySub$.next();
  }
}
