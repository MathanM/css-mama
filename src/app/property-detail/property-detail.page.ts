import {Component, Input, OnInit} from '@angular/core';
import {CSSChildExample, CSSObject, CSSProp, CSSPropExample, CSSValue} from '../models/css.model';
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
  selectedId: number|string;
  selectedChild: CSSChildExample;
  style = {};
  parentClass = 'body';
  childClass = 'child';
  selectedUnit = '';
  flag = false;
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
  /*
  * else if (this.exmData[this.i].pgChild) {
    if (this.selectedId = this.exmData[this.i].pgChild[0].pg[0].id, this.exmData[this.i].pgChild[0].pg.forEach(function(n) {
       l.i == n.id && (l.selectedId = n.id, l.selectedValue = n.value ? n.value : l.cssData[l.selectedId].pg[0])
        }), "slider" == this.cssData[this.selectedId].type && this.selectedValue) {
       var n = new RegExp(/([^0-9.-].*)/g).exec(this.selectedValue);
        this.unit = n ? n[0] : ""
     }
      this.childFlag = !0
   }
  * */
  private playgroundStyleBuilder() {
    this.selectedId = this.property.id;
    if (this.exampleData.pg){
      this.exampleData.pg.forEach((prop) => {
        this.style[this.cssData[prop].prop] = this.cssData[prop].pg[0];
        if (this.cssData[prop].type === 'slider'){
          this.getLengthUnit(this.cssData[prop].pg[0]);
        }
      });
    }
    if (this.exampleData.pgChild){
      if (this.exampleData.pgChild[0].pg){
        this.exampleData.pgChild[0].pg.forEach((prop) => {
          if (prop.id === this.property.id + ''){
            this.selectedChild = this.exampleData.pgChild[0];
          }
        });
      }
      this.exampleData.pgChild.forEach((child) => {
        if (child.pg){
          child.pg.forEach((prop) => {
            if (!this.style[child.className]){
              this.style[child.className] = {};
            }
            this.style[child.className][this.cssData[prop.id].prop] = prop.value ? prop.value : this.cssData[prop.id].pg[0];
            if (prop.id === (this.property.id + '') && this.cssData[prop.id].type === 'slider'){
              this.getLengthUnit(this.cssData[prop.id].pg[0]);
            }
          });
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
    if (this.selectedChild){
      this.style[this.selectedChild.className][this.cssData[this.selectedId].prop] += this.selectedUnit;
    }else{
      this.style[this.cssData[this.selectedId].prop] += this.selectedUnit;
    }
  }
  onPropertyClick(i, flag?){
    if (flag){
      this.selectedChild = undefined;
    }
    this.selectedId = this.cssData[i].id;
    if (this.selectedChild){
      this.getLengthUnit(this.style[this.selectedChild.className][this.cssData[i].prop]);
    }else{
      this.getLengthUnit(this.style[this.cssData[i].prop]);
    }
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
  onClick(): void{
    this.flag = !this.flag;
  }
  onChildClick(child: any): void{
    this.selectedChild = child;
  }
}
