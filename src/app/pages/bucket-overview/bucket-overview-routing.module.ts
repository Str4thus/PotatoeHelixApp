import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BucketOverviewPage } from './bucket-overview.page';

const routes: Routes = [
  {
    path: '',
    component: BucketOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BucketOverviewPageRoutingModule {}
