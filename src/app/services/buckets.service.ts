import { Injectable } from '@angular/core';
import { ApiService, Endpoints } from './api.service';
import { AuthService } from './auth.service';
import { BucketModel } from '../models/BucketModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Platform } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BucketsService {
  private selectedBucket: BucketModel = null;
  private selectedBucketDetails: BucketModel = null;

  constructor(private api: ApiService, private authService: AuthService, private plt: Platform, private fileTransfer: FileTransfer) {
    api.addDefaultHeaders({ 'Authorization': 'Token ' + this.authService.getToken() });
    api.updateMediaRoot();
  }

  getBuckets(): Observable<any> {
    return this.api.get(Endpoints.BucketList);
  }

  createBucket(bucket: BucketModel): Observable<any> {
    return this.api.post(Endpoints.BucketList, bucket);
  }

  updateBucket(bucketId: number, changes: {}): Observable<any> {
    return this.api.patch(Endpoints.BucketDetails + bucketId + "/", changes)
  }

  deleteBucket(bucketId: number) {
    return this.api.delete(Endpoints.BucketDetails + bucketId + "/")
  }

  selectBucket(bucket: BucketModel): Observable<any> {
    this.selectedBucket = bucket;
    return this.api.get(Endpoints.BucketDetails + this.selectedBucket.id + "/").pipe(
      map((bucket, id) => {
        this.selectedBucketDetails = this.plt.is("cordova") ? JSON.parse(bucket["data"]) as BucketModel : bucket as BucketModel;
        
        for (let i in this.selectedBucketDetails.images) {
          console.log(this.selectedBucketDetails.images[i].image)
          this.selectedBucketDetails.images[i].image = this.api.getMediaRoot() + this.selectedBucketDetails.images[i].image;
          console.log(this.selectedBucketDetails.images[i].image)
        }
      })
    );
  }

  addImage(image: string) {
    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    let options: FileUploadOptions = {
      fileKey: 'image',
      fileName: 'dhstgrtrthadfsg3t.jpg',
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: {'bucket': this.selectedBucket.id},
      headers: { 'Authorization': 'Token ' + this.authService.getToken() },
    }

    fileTransfer.upload(image, Endpoints.ApiRoot + Endpoints.Images, options)
      .then((data) => {
        // success
        alert("success");
      }, (err) => {
        // error
        alert("error" + JSON.stringify(err));
      });
  }

  deleteImage(imageId: number) {
    this.api.delete(Endpoints.Images + imageId + "/")
  }

  unselectBucket(): void {
    this.selectedBucket = null;
  }

  getSelectedBucket(): BucketModel {
    return this.selectedBucketDetails;
  }
}
