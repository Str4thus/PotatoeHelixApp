import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bucket-add',
  templateUrl: './bucket-add.page.html',
  styleUrls: ['./bucket-add.page.scss'],
})
export class BucketAddPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

}
