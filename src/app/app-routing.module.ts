import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'selectors',
    loadChildren: () => import('./selectors/selectors.module').then( m => m.SelectorsPageModule)
  },
  {
    path: 'colors',
    loadChildren: () => import('./colors/colors.module').then( m => m.ColorsPageModule)
  },
  {
    path: 'property-detail',
    loadChildren: () => import('./property-detail/property-detail.module').then( m => m.PropertyDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
