import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavController, IonRefresher } from '@ionic/angular';
import { BucketsComponent } from 'src/app/components/buckets/buckets.component';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-bucket-overview',
  templateUrl: './bucket-overview.page.html',
  styleUrls: ['./bucket-overview.page.scss'],
})
export class BucketOverviewPage implements OnInit {
  @ViewChild(BucketsComponent, { static: true }) bucketsComponent: BucketsComponent;
  @ViewChild(IonRefresher, {static: true}) refreshser: IonRefresher;

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
      })
      .catch((err) => {
        event.target.complete();
        this.toastService.presentToast("Es ist ein Fehler aufgetreten. (ERR-9)");
      });
  }
}
