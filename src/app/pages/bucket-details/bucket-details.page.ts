import { Component, OnInit, ViewChild } from '@angular/core';
import { BucketEditorComponent } from 'src/app/components/bucket-editor/bucket-editor.component';
import { NavController } from '@ionic/angular';
import { BucketPhotosComponent } from 'src/app/components/bucket-photos/bucket-photos.component';
import { DependsOnBucketData } from 'src/app/interfaces/DependsOnBucketData';

@Component({
  selector: 'app-bucket-details',
  templateUrl: './bucket-details.page.html',
  styleUrls: ['./bucket-details.page.scss'],
})
export class BucketDetailsPage implements OnInit {
  @ViewChild(BucketEditorComponent, { static: true }) bucketEditor: BucketEditorComponent;

  constructor(private navCtrl: NavController) { }

  ngOnInit() { }

  saveBucket() {
    this.bucketEditor.saveBucket().subscribe(res => {
      this.navCtrl.pop();
    });
  }

  deleteBucket() {
    this.bucketEditor.deleteBucket().subscribe(res => {
      this.navCtrl.pop();
    });
  }
}
