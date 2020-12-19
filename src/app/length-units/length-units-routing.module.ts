import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LengthUnitsPage } from './length-units.page';

const routes: Routes = [
  {
    path: '',
    component: LengthUnitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LengthUnitsPageRoutingModule {}
