import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectorsPageRoutingModule } from './selectors-routing.module';

import { SelectorsPage } from './selectors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectorsPageRoutingModule
  ],
  declarations: [SelectorsPage]
})
export class SelectorsPageModule {}
