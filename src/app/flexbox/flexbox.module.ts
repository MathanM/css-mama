import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlexboxPageRoutingModule } from './flexbox-routing.module';

import { FlexboxPage } from './flexbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexboxPageRoutingModule
  ],
  declarations: [FlexboxPage]
})
export class FlexboxPageModule {}
