import { Component, OnInit } from '@angular/core';
import { BucketsService } from 'src/app/services/buckets.service';
import { BucketModel } from 'src/app/models/BucketModel';
import { DependsOnBucketData } from 'src/app/interfaces/DependsOnBucketData';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from 'src/app/pages/image-modal/image-modal.page';

@Component({
  selector: 'bucket-photos',
  templateUrl: './bucket-photos.component.html',
  styleUrls: ['./bucket-photos.component.scss'],
})
export class BucketPhotosComponent implements OnInit, DependsOnBucketData {
  private activeBucket: BucketModel = null;

  constructor(private bucketService: BucketsService, private camera: Camera, private modalController: ModalController) { }

  ngOnInit() {
    this.initFieldsWithBucketData();
  }

  initFieldsWithBucketData() {
    this.activeBucket = this.bucketService.getSelectedBucket();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = imageData;
      this.bucketService.addImage(base64Image);
    }, (err) => {
      console.log(err);
    });
  }

  choosePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = imageData;
      this.bucketService.addImage(base64Image);
    }, (err) => {
      console.log(err);
    });
  }

  viewPicture(image: string) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: image,
      }
    }).then(modal => modal.present());
  }
}
