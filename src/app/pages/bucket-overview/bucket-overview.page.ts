import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavController, LoadingController } from '@ionic/angular';
import { BucketsComponent } from 'src/app/components/buckets/buckets.component';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-bucket-overview',
  templateUrl: './bucket-overview.page.html',
  styleUrls: ['./bucket-overview.page.scss'],
})
export class BucketOverviewPage implements OnInit {
  @ViewChild(BucketsComponent, { static: true }) bucketsComponent: BucketsComponent;

  constructor(private authService: AuthService, private navCtrl: NavController, private toastService: ToastService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.bucketsComponent.loadBuckets();
  }

  confirmLogout() {
    this.toastService.presentConfirmationToast("Ausloggen?", this, "logout");
  }

  logout() {
    this.authService.logout();
  }

  addBucket() {
    this.navCtrl.navigateForward("/bucket-add");
  }

  updateBucketlist(event: any) {
    this.bucketsComponent.loadBuckets()
      .then(() => {
        event.target.complete()
      });
  }
}
