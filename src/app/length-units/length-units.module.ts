import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LengthUnitsPageRoutingModule } from './length-units-routing.module';

import { LengthUnitsPage } from './length-units.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LengthUnitsPageRoutingModule
  ],
  declarations: [LengthUnitsPage]
})
export class LengthUnitsPageModule {}
