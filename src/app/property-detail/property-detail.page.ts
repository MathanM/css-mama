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
  @Input() selector: boolean;
  shortHandProp: any[] = [];
  propValue: CSSValue[] = [];
  selectedId: number;
  style = {};
  parentClass = 'body';
  childClass = 'child';
  selectedUnit = '';
  constructor(public util: UtilityService) { }

  ngOnInit() {
    this.shortHandBuilder();
    this.propertyValueBuilder();
    this.playgroundStyleBuilder();
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
    if (this.property.values){
      this.propValue = [...this.propValue, ...this.property.values];
    }
  }
  private playgroundStyleBuilder() {
    if (this.exampleData.pg){
      this.selectedId = this.property.id;
      this.exampleData.pg.forEach((prop) => {
        this.style[this.cssData[prop].prop] = this.cssData[prop].pg[0];
        if (this.cssData[prop].type === 'slider'){
          this.getLengthUnit(this.cssData[prop].pg[0]);
        }
      });
    }
    if (this.exampleData.required){
      this.exampleData.required.forEach((item) => {
        this.style[item.prop] = item.value;
      });
    }
  }
  private getLengthUnit(val: string){
    const n = new RegExp(/([^0-9.-].*)/g).exec(val);
    this.selectedUnit = n ? n[0] : '';
  }
  onStyleChange(){
    console.log(this.style);
  }
  onSliderChange(){
    this.style[this.cssData[this.selectedId].prop] += this.selectedUnit;
  }
  onPropertyClick(i){
    this.selectedId = this.cssData[i].id;
    this.getLengthUnit(this.style[this.cssData[i].prop]);
  }
  generateHTML(code: string): string{
    let out = code;
    let e = '';
    ['<', '>', '='].forEach((c) => {
      if (c === '<'){
        e = '&lt;';
      }else if (c === '>'){
        e = '&gt;';
      }else if (c === '='){
        e = '&#61;';
      }
      out = out.replace(new RegExp(c, 'g'), e);
    });
    out = out.replace(
        new RegExp(/ (.*?)(?=&#61;)/g),
        '<span class="attr">$&</span>'
    );
    out = out.replace(
        new RegExp(/&lt;(.*?)(?:;)/g),
        '<span class="tag">$&</span>'
    );
    out = out.replace(
        new RegExp(/'(.*?)'/g),
        '<span class="attrValue">$&</span>'
    );
    out = out.replace(
        new RegExp('\'', 'g'),
        '<span class="splChara">\'</span>'
    );
    out = out.replace(
        new RegExp('&#61;', 'g'),
        '<span class="splChara">&#61;</span>'
    );
    return out;
  }
  generateCSS(code: string): string{
    return this.util.generateCSS(code);
  }
}
