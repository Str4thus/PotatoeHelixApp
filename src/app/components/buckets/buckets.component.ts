import { Component, OnInit } from '@angular/core';
import { BucketsService } from 'src/app/services/buckets.service';
import { BucketModel } from 'src/app/models/BucketModel';

@Component({
  selector: 'buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss'],
})
export class BucketsComponent implements OnInit {
  allBuckets: BucketModel;

  constructor(private bucketService: BucketsService) { }

  ngOnInit() {}

  retrieveBuckets() {
    this.bucketService.getBuckets().subscribe(data => {
      this.allBuckets = data as BucketModel;
    },
      err => {
        console.log(err);
      })
  }
}
