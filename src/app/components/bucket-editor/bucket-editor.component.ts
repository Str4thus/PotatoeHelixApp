import { Component, OnInit } from '@angular/core';
import { BucketsService } from 'src/app/services/buckets.service';
import { BucketModel } from 'src/app/models/BucketModel';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'bucket-editor',
  templateUrl: './bucket-editor.component.html',
  styleUrls: ['./bucket-editor.component.scss'],
})
export class BucketEditorComponent implements OnInit {
  private bucketToEdit: BucketModel = null; // reference
  private editableBucket: BucketModel = null; // gets edited

  constructor(private bucketService: BucketsService) { }

  ngOnInit() {
    this.initFieldsWithBucketData();
  }

  initFieldsWithBucketData(): void {
    this.bucketToEdit = this.bucketService.getSelectedBucket();
    this.editableBucket = {...this.bucketToEdit} // cloning the bucket to edit to have a work copy
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

  wasBucketEdited(): boolean {
    return JSON.stringify(this.editableBucket) !== JSON.stringify(this.bucketToEdit);
  }

  saveBucket(): void {
    console.log("saved!");
  }
}
