import { Injectable } from '@angular/core';
import { ApiService, Endpoints } from './api.service';
import { AuthService } from './auth.service';
import { BucketModel } from '../models/BucketModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BucketsService {
  private selectedBucket: BucketModel = null;

  constructor(private api: ApiService, private authService: AuthService) {
    api.addDefaultHeaders({ 'Authorization': 'Token ' + this.authService.getToken() });
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

  selectBucket(bucket: BucketModel): void {
    this.selectedBucket = bucket;
  }

  unselectBucket(): void {
    this.selectedBucket = null;
  }

  getSelectedBucket(): BucketModel {
    return this.selectedBucket;
  }
}
