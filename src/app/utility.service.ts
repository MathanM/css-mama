import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  modal: any;
  constructor(public modalController: ModalController, public popoverController: PopoverController) {}

  async presentModal(modalConfig): Promise<any>{
    this.modal = await this.modalController.create(modalConfig);
    return await this.modal.present();
  }
  async presentPopover(popoverConfig): Promise<any>{
    const popover = await this.popoverController.create(popoverConfig);
    return await popover.present();
  }
  async dismissModal(): Promise<any>{
    if (this.modal){
      return this.modal.dismiss();
    }
  }
  keys(obj: any): any[]{
    return Object.keys(obj);
  }
  generateCSS(code: string): string{
    let out = code;
    let e = '';
    let p = '';
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
        p = ' ';
      }else if (c === ';'){
        e = '\n\t';
        p = '';
      }else if (c === ':'){
        e = ' ';
        p = '';
      }else if (c === '}'){
        e = '\n';
        p = '';
      }
      out = out.replace(
          new RegExp(c, 'g'),
          p + '<span class="splChara">' + c + '</span>' + e
      );
      out = out.replace(
          new RegExp(/\t<span class="splChara">}<\/span>/g),
          '<span class="splChara">}</span>'
      );
    });
    return out;
  }
}
