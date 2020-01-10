import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BucketDetailsPageRoutingModule } from './bucket-details-routing.module';

import { BucketDetailsPage } from './bucket-details.page';
import { BucketEditorComponent } from 'src/app/components/bucket-editor/bucket-editor.component';
import { BucketPhotosComponent } from 'src/app/components/bucket-photos/bucket-photos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BucketDetailsPageRoutingModule
  ],
  declarations: [BucketDetailsPage, BucketEditorComponent, BucketPhotosComponent]
})
export class BucketDetailsPageModule {}
