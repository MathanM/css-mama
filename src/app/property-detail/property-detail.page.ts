import {Component, Input, OnInit} from '@angular/core';
import {CSSObject, CSSProp, CSSPropExample, CSSValue} from '../models/css.model';
import {UtilityService} from '../utility.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.page.html',
  styleUrls: ['./property-detail.page.scss'],
})
export class PropertyDetailPage implements OnInit {
  @Input() property: CSSProp;
  @Input() cssData: CSSObject;
  @Input() exampleData: CSSPropExample;
  shortHandProp: any[] = [];
  propValue: CSSValue[] = [];
  constructor(public util: UtilityService) { }

  ngOnInit() {
    this.shortHandBuilder();
    this.propertyValueBuilder();
  }

  private shortHandBuilder() {
    if (this.property.shortHand){
      this.shortHandProp = this.property.shortHand.map((val) => {
        if (typeof val === 'number'){
          return this.cssData[val].prop;
        }else{
          let result = '';
          const props = val.split('/');
          props.forEach((prop, index) => {
            result += this.cssData[prop].prop + (index === (props.length - 1) ? '' : '/');
          });
          return result;
        }
      });
    }
  }

  private propertyValueBuilder() {
    if (this.property.madeOf){
      this.propValue = this.property.madeOf.map((val) => {
        const value: CSSValue = {
          name: '',
          desc: ''
        };
        value.name = this.cssData[val].prop;
        value.desc = this.cssData[val].desc[0];
        return value;
      });
    }
    this.propValue = [...this.propValue, ...this.property.values];
  }

  generateCSS(code: string): string{
    let out = code;
    let e = '';
    const splChars = ['{', '}', ':', ';'];
    out = out.replace(
        new RegExp(/\s(\w+)([-\w]+)(?=:)/g),
        '<span class="prop">$&</span>'
    );
    out = out.replace(
        /:(.*?)(?=;)/g,
        '<span class="value">$&</span>'
    );
    splChars.forEach(c => {
      if (c === '{'){
        e = '\n\t';
      }else if (c === ';'){
        e = '\n\t';
      }else if (c === ':'){
        e = ' ';
      }else if (c === '}'){
        e = '\n';
      }
      out = out.replace(
          new RegExp(c, 'g'),
          '<span class=\'splChara\'>' + c + '</span>' + e
      );
    });
    return out;
  }
}
