import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {CSSExampleObject, CSSGroup, CSSObject, CSSSelectorObject} from './models/css.model';
import {ColorTypes} from './models/color.model';
import {FlexObject} from './models/flex.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  sort = new BehaviorSubject<string|undefined>('');
  filter = new BehaviorSubject<string|undefined>('');
  constructor(private http: HttpClient) {}
  getCSSPropertiesData(): Observable<CSSObject> {
    return this.http.get<CSSObject>('assets/json/css.json');
  }
  getCSSPropertiesExampleData(): Observable<CSSExampleObject> {
    return this.http.get<CSSExampleObject>('assets/json/example.json');
  }
  getCSSGroup(): Observable<CSSGroup[]>{
    return this.http.get<CSSGroup[]>('assets/json/css-group.json');
  }
  getCSSSelectors(): Observable<CSSSelectorObject>{
    return this.http.get<CSSSelectorObject>('assets/json/selector.json');
  }
  getCSSSelectorGroup(): Observable<CSSGroup[]>{
    return this.http.get<CSSGroup[]>('assets/json/selector-group.json');
  }
  getColorConfig(): Observable<ColorTypes>{
    return this.http.get<ColorTypes>('assets/json/color.json');
  }
  getCSSFlexbox(): Observable<FlexObject>{
    return this.http.get<FlexObject>('assets/json/flex.json');
  }
}
