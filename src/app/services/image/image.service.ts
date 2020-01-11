import { Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { Endpoints, ApiService } from '../api/api.service';
import { File } from '@ionic-native/file/ngx';
import { BucketsService } from '../buckets/buckets.service';
import { AuthService } from '../auth/auth.service';
import { Util } from '../../util/Util';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private fileTransferObj: FileTransferObject;

  constructor(private api: ApiService, private bucketService: BucketsService, private authService: AuthService, private toastService: ToastService,
    private fileTransfer: FileTransfer, private file: File) {
    this.fileTransferObj = this.fileTransfer.create();
  }

  async uploadImage(image: string): Promise<any> {
    let bucket = this.bucketService.getSelectedBucket();

    let options: FileUploadOptions = {
      fileKey: 'image',
      fileName: Util.createRandomString(16) + '.jpg', // TODO randomize
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: { 'bucket': bucket.getValue().id },
      headers: { 'Authorization': 'Token ' + this.authService.getToken() },
    }

    this.toastService.presentToast("Hochladen...");
    return this.fileTransferObj.upload(image, Endpoints.getApiRoot() + Endpoints.getImageListEndpoint(), options)
      .then((_) => {
        this.toastService.presentToast("Das Bild wurde hochgeladen!");
      }, (err) => {
        this.toastService.presentToast("Es ist ein Fehler aufgetreten. (ERR-4)");
      });
  }

  async downloadImage(url: string): Promise<any> {
    this.toastService.presentToast("Herunterladen...");
    return this.fileTransferObj.download(url, this.file.externalRootDirectory + "Buckets/Bucket Images/" + Util.getFileNameFromUrl(url))
      .then((entry) => {
        this.toastService.presentToast("Das Bild wurde runtergeladen!");
      }, (err) => {
        this.toastService.presentToast("Es ist ein Fehler aufgetreten. (ERR-5)");
      });
  }

  async deleteImage(imageId: number): Promise<any> {
    this.toastService.presentToast("Löschen...");
    return this.api.delete(Endpoints.getImageDetailEndpoint(imageId))
      .then((res) => {
        this.bucketService.reselectCurrentBucket().then(() => {
          this.toastService.presentToast("Das Bild wurde gelöscht!");
        });
      });
  }
}
