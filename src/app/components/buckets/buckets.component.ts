import { Component, OnInit, ViewChild } from '@angular/core';
import { BucketsService } from 'src/app/services/buckets/buckets.service';
import { BucketModel } from 'src/app/models/BucketModel';
import { IonInfiniteScroll, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss'],
})
export class BucketsComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  allBuckets: BucketModel[];

  constructor(private bucketService: BucketsService, private navCtrl: NavController, private plt: Platform) { }

  ngOnInit() { }

  async loadBuckets(): Promise<any> {
    return this.bucketService.getBuckets()
      .then((data) => {
        this.allBuckets = [];

        data = data as BucketModel[];
        for (let bucket of data) {
          this.allBuckets.unshift(bucket); // newest bucket always at the top
          bucket.notes = bucket.notes || "Keine Notizen ...";
        }
      });
  }

  viewBucket(bucket: BucketModel) {
    this.bucketService.selectBucket(bucket)
      .then(() => {
        if (this.bucketService.getSelectedBucket().getValue())
          this.navCtrl.navigateForward("bucket-details");
        else
          this.loadBuckets();
      })
  }
}
