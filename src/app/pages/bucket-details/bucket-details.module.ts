import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BucketDetailsPageRoutingModule } from './bucket-details-routing.module';

import { BucketDetailsPage } from './bucket-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BucketDetailsPageRoutingModule
  ],
  declarations: [BucketDetailsPage]
})
export class BucketDetailsPageModule {}
