import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import { ImageService } from 'src/app/services/image/image.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  private imgId: number;
  private img: string;

  constructor(private imageSerivce: ImageService, private navParams: NavParams, private modalController: ModalController,
      private toastService: ToastService) { }

  ngOnInit() {
    this.imgId = this.navParams.get('id');
    this.img = this.navParams.get('img');
  }

  close() {
    this.modalController.dismiss();
  }

  downloadImage() {
    this.imageSerivce.downloadImage(this.img);
  }

  confirmImageDeletion() {
    this.toastService.presentConfirmationToast("Löschen?", this, "deleteImage");
  }

  deleteImage() {
    this.imageSerivce.deleteImage(this.imgId).then(() => {
      this.modalController.dismiss();
    });
  }
}
