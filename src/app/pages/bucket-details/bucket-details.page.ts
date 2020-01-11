import { Component, OnInit, ViewChild } from '@angular/core';
import { BucketEditorComponent } from 'src/app/components/bucket-editor/bucket-editor.component';
import { NavController } from '@ionic/angular';
import { BucketsService } from 'src/app/services/buckets/buckets.service';
import { ToastService } from 'src/app/services/toast/toast.service';


@Component({
  selector: 'app-bucket-details',
  templateUrl: './bucket-details.page.html',
  styleUrls: ['./bucket-details.page.scss'],
})
export class BucketDetailsPage implements OnInit {
  @ViewChild(BucketEditorComponent, { static: true }) bucketEditor: BucketEditorComponent;

  constructor(private bucketService: BucketsService, private navCtrl: NavController, private toastService: ToastService) { }

  ngOnInit() { }

  saveBucket() {
    this.bucketEditor.saveBucket()
      .then(() => {
        this.navCtrl.pop();
      })
      .catch((err) => {
        this.toastService.presentToast("Es ist ein Fehler aufgetreten. (ERR-10)")
      });
  }

  confirmBucketDeletion() {
    this.toastService.presentConfirmationToast("Löschen?", this, "deleteBucket")
  }

  deleteBucket() {
    this.bucketEditor.deleteBucket()
      .then(() => {
        this.navCtrl.pop();
      })
      .catch((err) => {
        this.toastService.presentToast("Es ist ein Fehler aufgetrete. (ERR-2)")
      });
  }

  onBack() {
    this.bucketService.unselectBucket();
  }
}
