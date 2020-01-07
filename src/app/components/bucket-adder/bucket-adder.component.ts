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

  private bucket: BucketModel = { title: '' }
  private errorMessage: string;

  constructor(private bucketService: BucketsService, private navCtrl: NavController) { }

  ngOnInit() { }

  create() {
    this.bucketService.createBucket(this.bucket).subscribe(_ => {
      this.navCtrl.pop();
    }, err => {
      switch (err.status) {
        case 400:
          this.errorMessage = "Nicht alle erforderlichen Felder wurden ausgefüllt!";
          break;
        default:
          this.errorMessage = "Ein unbekannter Fehler ist aufgetreten (" + err.status + ")";
          break;
      }
    })
  }
}
