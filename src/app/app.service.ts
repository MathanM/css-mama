import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {CSSGroup, CSSObject, CSSSelectorObject} from './models/css.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}
  getCSSPropertiesData(): Observable<CSSObject> {
    return this.http.get<CSSObject>('assets/json/css.json');
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
}
