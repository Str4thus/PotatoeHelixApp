import { Injectable } from '@angular/core';
import { ApiService, Endpoints } from './api.service';
import { AuthService } from './auth.service';
import { BucketModel } from '../models/BucketModel';

@Injectable({
  providedIn: 'root'
})

export class BucketsService {

  constructor(private api: ApiService, private authService: AuthService) { 
    api.addDefaultHeaders({'Authorization': 'Token ' + this.authService.getToken()});
  }

  getBuckets() {
    return this.api.get(Endpoints.BucketList);
  }

  createBucket(bucket: BucketModel) {
    return this.api.post(Endpoints.BucketList, bucket);
  }
}
