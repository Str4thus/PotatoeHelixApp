import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { BucketsComponent } from 'src/app/components/buckets/buckets.component';

@Component({
  selector: 'app-bucket-overview',
  templateUrl: './bucket-overview.page.html',
  styleUrls: ['./bucket-overview.page.scss'],
})
export class BucketOverviewPage implements OnInit {
  @ViewChild(BucketsComponent, { static: true }) bucketsComponent: BucketsComponent;

  constructor(private authService: AuthService, private storage: Storage, private navCtrl: NavController) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.bucketsComponent.loadBuckets();
  }

  clear() {
    this.storage.clear();
    this.authService.canActivate();
  }

  addBucket() {
    this.navCtrl.navigateForward("/bucket-add");
  }
}
