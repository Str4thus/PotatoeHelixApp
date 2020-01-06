import { Component, OnInit } from '@angular/core';
import { BucketsService } from 'src/app/services/buckets.service';
import { BucketModel } from 'src/app/models/BucketModel';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'bucket-adder',
  templateUrl: './bucket-adder.component.html',
  styleUrls: ['./bucket-adder.component.scss'],
})
export class BucketAdderComponent implements OnInit {

  bucket: BucketModel = { title: '' }

  constructor(private bucketService: BucketsService, private navCtrl: NavController) { }

  ngOnInit() { }

  create() {
    console.log("creating!");
    console.log(this.bucket);
    this.bucketService.createBucket(this.bucket).subscribe(data => {
      this.navCtrl.pop();
    }, err => {
      console.log(err)
    })
  }
}
