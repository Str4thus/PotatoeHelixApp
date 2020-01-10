import { Component, OnInit } from '@angular/core';
import { BucketsService } from 'src/app/services/buckets.service';
import { BucketModel } from 'src/app/models/BucketModel';
import { Observable } from 'rxjs';
import dateformat from 'dateformat';
import { DependsOnBucketData } from 'src/app/interfaces/DependsOnBucketData';

@Component({
  selector: 'bucket-editor',
  templateUrl: './bucket-editor.component.html',
  styleUrls: ['./bucket-editor.component.scss'],
})
export class BucketEditorComponent implements OnInit, DependsOnBucketData {
  private bucketToEdit: BucketModel = null; // reference
  private editableBucket: BucketModel = null; // gets edited

  constructor(private bucketService: BucketsService) { }

  ngOnInit() { 
    this.initFieldsWithBucketData();
  }
  
  initFieldsWithBucketData(): void {
    this.bucketToEdit = this.bucketService.getSelectedBucket();
    this.editableBucket = { ...this.bucketToEdit } // cloning the bucket to edit, to have a work copy
  }

  getStatusColor(): string {
    return this.editableBucket.is_done ? "success" : "danger";
  }

  getStatusText(): string {
    return this.editableBucket.is_done ? "Erledigt!" : "Offen!";
  }


  toggleDone(): void {
    this.editableBucket.is_done = !this.editableBucket.is_done;

    if (this.editableBucket.is_done) {
      this.editableBucket.date = new Date(Date.now()).toISOString();
    }
  }

  formatDate() {
    this.editableBucket.date = dateformat(new Date(this.editableBucket.date), "yyyy-mm-dd");
  }

  wasBucketEdited(): boolean {
    return JSON.stringify(this.editableBucket) !== JSON.stringify(this.bucketToEdit);
  }

  saveBucket(): Observable<any> {
    let changes = {}

    for (let prop in this.editableBucket) {
      if (this.editableBucket.hasOwnProperty(prop) && this.editableBucket[prop] != this.bucketToEdit[prop]) {
        changes[prop] = this.editableBucket[prop];
      }
    }

    return this.bucketService.updateBucket(this.editableBucket.id, changes);
  }

  deleteBucket(): Observable<any> {
    return this.bucketService.deleteBucket(this.editableBucket.id);
  }
}
