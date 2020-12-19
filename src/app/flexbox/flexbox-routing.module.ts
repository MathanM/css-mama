import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlexboxPage } from './flexbox.page';

const routes: Routes = [
  {
    path: '',
    component: FlexboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlexboxPageRoutingModule {}
