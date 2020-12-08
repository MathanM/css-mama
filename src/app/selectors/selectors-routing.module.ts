import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectorsPage } from './selectors.page';

const routes: Routes = [
  {
    path: '',
    component: SelectorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectorsPageRoutingModule {}
