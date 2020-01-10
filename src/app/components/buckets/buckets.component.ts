import { Component, OnInit, ViewChild } from '@angular/core';
import { BucketsService } from 'src/app/services/buckets.service';
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

  loadBuckets() {
    this.bucketService.getBuckets().subscribe(data => {
      this.allBuckets = this.plt.is("cordova") ? JSON.parse(data.data) as BucketModel[] : data as BucketModel[];

      for (let bucketId in this.allBuckets) {
        this.allBuckets[bucketId] = { id: Number.parseInt(bucketId) + 1, ...this.allBuckets[bucketId] }
      }
    },
      err => {
        console.log(err);
      })
  }

  viewBucket(bucket: BucketModel) {
    this.bucketService.selectBucket(bucket).subscribe(_ => {
      this.navCtrl.navigateForward("bucket-details");
    });
  }
}
