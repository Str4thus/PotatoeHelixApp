import { Component, OnInit } from '@angular/core';
import { BucketsService } from 'src/app/services/buckets/buckets.service';
import { BucketModel } from 'src/app/models/BucketModel';
import { DependsOnBucketData } from 'src/app/interfaces/DependsOnBucketData';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from 'src/app/pages/image-modal/image-modal.page';
import { ImageModel } from 'src/app/models/ImageModel';
import { ImageService } from 'src/app/services/image/image.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'bucket-photos',
  templateUrl: './bucket-photos.component.html',
  styleUrls: ['./bucket-photos.component.scss'],
})
export class BucketPhotosComponent implements OnInit, DependsOnBucketData {
  private activeBucket: BucketModel = null;

  constructor(private bucketService: BucketsService, private imageService: ImageService, private camera: Camera, private modalController: ModalController) { }

  ngOnInit() {
    this.initFieldsWithBucketData();
  }

  initFieldsWithBucketData() {
    this.bucketService.getSelectedBucket().subscribe((value) => {
      this.activeBucket = value;
    });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        let base64Image = imageData;
        this.imageService.uploadImage(base64Image)
          .then(() => {
            this.bucketService.reselectCurrentBucket();
          });
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

    this.camera.getPicture(options)
      .then((imageData) => {
        let base64Image = imageData;
        this.imageService.uploadImage(base64Image)
          .then(() => {
            this.bucketService.reselectCurrentBucket();
          });;
      });
  }

  viewPicture(image: ImageModel) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        id: image.id,
        img: image.image,
      }
    }).then(modal => modal.present());
  }
}
