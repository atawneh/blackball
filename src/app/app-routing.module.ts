import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddComponent } from './Add/add.component';
import { DetailsComponent } from './details/details.component';
import { AddresponsComponent } from './addrespons/addrespons.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
  path:'add',
  component:AddComponent
  },
  {
  path:'details/:id',
  component:DetailsComponent
  },
  {
  path:'adddetails/:id',
  component:AddresponsComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
