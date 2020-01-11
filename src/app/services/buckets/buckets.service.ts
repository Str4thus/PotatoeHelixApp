import { Injectable } from '@angular/core';
import { ApiService, Endpoints } from '../api/api.service';
import { BucketModel } from '../../models/BucketModel';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class BucketsService {
  private selectedBucket: BehaviorSubject<BucketModel> = new BehaviorSubject<BucketModel>(null);
  private selectedBucketDetails: BehaviorSubject<BucketModel> = new BehaviorSubject<BucketModel>(null);;

  constructor(private api: ApiService, private toastService: ToastService) { }

  unselectBucket(): void {
    this.selectedBucketDetails.next(null);
  }

  getSelectedBucket(): BehaviorSubject<BucketModel> {
    return this.selectedBucketDetails;
  }

  reselectCurrentBucket(): Promise<any> {
    return this.selectBucket(this.selectedBucket.getValue());
  }

  async getBuckets(): Promise<any> {
    return this.api.get(Endpoints.getBucketListEndpoint());
  }

  async createBucket(bucket: BucketModel): Promise<any> {
    return this.api.post(Endpoints.getBucketListEndpoint(), bucket);
  }

  async updateBucket(bucketId: number, changes: {}): Promise<any> {
    return this.api.patch(Endpoints.getBucketDetailsEndpoint(bucketId), changes)
  }

  async deleteBucket(bucketId: number): Promise<any> {
    return this.api.delete(Endpoints.getBucketDetailsEndpoint(bucketId));
  }

  async selectBucket(bucket: BucketModel): Promise<any> {
    this.selectedBucket.next(bucket);

    return this.api.get(Endpoints.getBucketDetailsEndpoint(this.selectedBucket.getValue().id))
      .then((bucket) => {
        let details = bucket as BucketModel
        this.selectedBucketDetails.next(details);

        for (let i in this.selectedBucketDetails.getValue().images) {
          this.selectedBucketDetails.getValue().images[i].image = Endpoints.getMediaRoot() + this.selectedBucketDetails.getValue().images[i].image;
        }
      })
      .catch((err) => {
        this.toastService.presentToast("Das Bucket ist nicht mehr verfügbar!");
      });
  }
}
