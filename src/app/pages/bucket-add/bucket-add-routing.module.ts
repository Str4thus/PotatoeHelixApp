import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BucketAddPage } from './bucket-add.page';

const routes: Routes = [
  {
    path: '',
    component: BucketAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BucketAddPageRoutingModule {}
