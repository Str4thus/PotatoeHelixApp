import { Injectable } from '@angular/core';
import { BucketModel } from 'src/app/models/BucketModel';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filterBucketsByTitle(keyword: string, queryset: BucketModel[]): BucketModel[] {
    if (keyword == "")
      return queryset;

    let filteredBuckets = [];
    for (let bucket of queryset) {
      if (bucket.title.toLowerCase().includes(keyword.toLowerCase())) {
        filteredBuckets.push(bucket);
      }
    }

    return filteredBuckets;
  }
}
