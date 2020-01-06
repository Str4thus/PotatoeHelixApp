import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BucketAddPageRoutingModule } from './bucket-add-routing.module';

import { BucketAddPage } from './bucket-add.page';
import { BucketAdderComponent } from 'src/app/components/bucket-adder/bucket-adder.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BucketAddPageRoutingModule
  ],
  declarations: [BucketAddPage, BucketAdderComponent]
})
export class BucketAddPageModule {}
