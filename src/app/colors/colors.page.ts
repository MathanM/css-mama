import { Component, OnInit } from '@angular/core';
import {ColorTypes} from '../models/color.model';
import {AppService} from '../app.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.page.html',
  styleUrls: ['./colors.page.scss'],
})
export class ColorsPage implements OnInit {
  constructor(private service: AppService,) { }
  color: ColorTypes;
  colorType = 'hex';
  ngOnInit() {
    this.service.getColorConfig().pipe(take(1)).subscribe((val) => {
      this.color = val;
    });
  }
  onHexChange() {
    this.getPrimaryColors();
    this.color.hex.r.value = this.dec2Hex(this.color.rgb.r.value);
    this.color.hex.g.value = this.dec2Hex(this.color.rgb.g.value);
    this.color.hex.b.value = this.dec2Hex(this.color.rgb.b.value);
    this.color.hex.value = '#' + this.color.hex.r.value + this.color.hex.g.value + this.color.hex.b.value;
    this.color.rgb.value = 'rgb(' + this.color.rgb.r.value + ', ' + this.color.rgb.g.value + ', ' + this.color.rgb.b.value + ')';
    this.color.rgba.r.value = this.color.rgb.r.value;
    this.color.rgba.g.value = this.color.rgb.g.value;
    this.color.rgba.b.value = this.color.rgb.b.value;
    this.color.rgba.value = 'rgba(' + this.color.rgba.r.value + ', ' + this.color.rgba.g.value + ', ' + this.color.rgba.b.value + ', ' + this.color.rgba.a.value / 10 + ')';
    this.color.hsl.value = 'hsl(' + this.color.hsl.h.value + ', ' + this.color.hsl.s.value + '%, ' + this.color.hsl.l.value + '%)';
    this.color.hsla.h.value = this.color.hsl.h.value;
    this.color.hsla.s.value = this.color.hsl.s.value;
    this.color.hsla.l.value = this.color.hsl.l.value;
    this.color.hsla.a.value = this.color.rgba.a.value;
    this.color.hsla.value = 'hsl(' + this.color.hsla.h.value + ', ' + this.color.hsla.s.value + '%, ' + this.color.hsla.l.value + '%, ' + this.color.hsla.a.value / 10 + ')';
  }
  dec2Hex(l){
    let n = l.toString(16);
    return n.length % 2 && (n = '0' + n), n;
  }
  getPrimaryColors(){
    'hsl' === this.colorType || 'hsla' === this.colorType ? this.getRGB() : this.getHSL();
  }
  hue2rgb(l, n, u) {
    return u < 0 && (u += 6), u >= 6 && (u -= 6), u < 1 ? (n - l) * u + l : u < 3 ? n : u < 4 ? (n - l) * (4 - u) + l : l;
  }
  // tslint:disable
  getRGB(){
    let l, n, u, e, t;
    let a = this.color.hsl.h.value;
    const i = this.color.hsl.s.value / 100;
    const s = this.color.hsl.l.value / 100;
    a >= 360 && (a = 0), a /= 60, l = 255 * this.hue2rgb(e = 2 * s - (t = s <= .5 ? s * (i + 1) : s + i - s * i), t, a + 2), n = 255 * this.hue2rgb(e, t, a), u = 255 * this.hue2rgb(e, t, a - 2), this.color.rgb.r.value = Math.round(l), this.color.rgb.g.value = Math.round(n), this.color.rgb.b.value = Math.round(u);
  }
  getHSL() {
    let l, n, u, e = this.color.rgb.r.value / 255,
        t = this.color.rgb.g.value / 255,
        a = this.color.rgb.b.value / 255,
        i = Math.max(e, t, a),
        s = Math.min(e, t, a),
        o = i - s;
    switch (i) {
      case e:
        u = t - a / o;
        break;
      case t:
        u = 2 + (a - e) / o;
        break;
      case a:
        u = 4 + (e - t) / o;
    }
    isNaN(u) && (u = 0), (u *= 60) < 0 && (u += 360), l = (s + i) / 2, n = s == i ? 0 : l < .5 ? o / (i + s) : o / (2 - o), this.color.hsl.h.value = Math.round(u), this.color.hsl.s.value = Math.round(100 * n), this.color.hsl.l.value = Math.round(100 * l);
  }
  // tslint:enable
  onColorSelect(type: string){
    this.colorType = type;
  }
}
