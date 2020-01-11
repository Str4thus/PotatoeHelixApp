import { Component, OnInit } from '@angular/core';
import { BucketsService } from 'src/app/services/buckets/buckets.service';
import { BucketModel } from 'src/app/models/BucketModel';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'bucket-adder',
  templateUrl: './bucket-adder.component.html',
  styleUrls: ['./bucket-adder.component.scss'],
})
export class BucketAdderComponent implements OnInit {
  private bucket: BucketModel = { title: '' }

  constructor(private bucketService: BucketsService, private navCtrl: NavController, private toastService: ToastService) { }

  ngOnInit() { }

  create() {
    this.toastService.presentToast("Erstelle Bucket...")
    this.bucketService.createBucket(this.bucket)
      .then(() => {
        this.toastService.presentToast("Das Bucket wurde erstellt!")
        this.navCtrl.pop();
      })
      .catch((err) => {
        switch (err.status) {
          case 400:
            this.toastService.presentToast("Nicht alle erforderlichen Felder wurden ausgefüllt!");
            break;
          default:
            this.toastService.presentToast("Es ist ein Fehler aufgetreten. (ERR-8)");
            break;
        }
      })
  }
}
