import { Component, OnInit, ViewChild } from '@angular/core';
import { BucketsService } from 'src/app/services/buckets/buckets.service';
import { BucketModel } from 'src/app/models/BucketModel';
import { IonInfiniteScroll, NavController, Platform } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss'],
})
export class BucketsComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  private allBuckets: BucketModel[] = []; // stores all buckets, not binded to UI
  private bucketList: BucketModel[] = []; // gets filtered, binded to UI

  private initializedWithData: boolean = false;
  private searchTerm: string = "";

  constructor(private bucketService: BucketsService, private navCtrl: NavController, private plt: Platform,
    private toastService: ToastService, private filterService: FilterService) { }

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

        this.bucketList = this.allBuckets;
      })
      .then(() => {
        this.initializedWithData = true;
      })
  }

  filterBuckets() {
    this.bucketList = this.filterService.filterBucketsByTitle(this.searchTerm, this.allBuckets);
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
