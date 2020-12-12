import { Component } from '@angular/core';
import {AppService} from '../app.service';
import {take} from 'rxjs/operators';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-filter-pop',
  templateUrl: './filter-pop.component.html',
  styleUrls: ['./filter-pop.component.scss'],
})
export class FilterPopComponent {
  sort: string;
  filter: string;
  constructor(private service: AppService) {
    combineLatest([this.service.filter, this.service.sort])
        .pipe(take(1))
    .subscribe(([filter, sort]) => {
      this.filter = filter;
      this.sort = sort;
    });
  }
  onFilter(e: CustomEvent){
    this.service.filter.next(e.detail.value);
  }
  onSort(e: CustomEvent){
    this.service.sort.next(e.detail.value);
  }

}
