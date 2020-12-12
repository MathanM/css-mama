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
}
