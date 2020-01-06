import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BucketOverviewPageRoutingModule } from './bucket-overview-routing.module';

import { BucketOverviewPage } from './bucket-overview.page';
import { BucketsComponent } from 'src/app/components/buckets/buckets.component';
import { BucketAdderComponent } from 'src/app/components/bucket-adder/bucket-adder.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BucketOverviewPageRoutingModule
  ],
  declarations: [BucketOverviewPage, BucketsComponent]
})
export class BucketOverviewPageModule {}
