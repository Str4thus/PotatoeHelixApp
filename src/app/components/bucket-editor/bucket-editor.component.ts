import { Component, OnInit } from '@angular/core';
import { BucketsService } from 'src/app/services/buckets/buckets.service';
import { BucketModel } from 'src/app/models/BucketModel';
import { Observable } from 'rxjs';
import dateformat from 'dateformat';
import { DependsOnBucketData } from 'src/app/interfaces/DependsOnBucketData';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'bucket-editor',
  templateUrl: './bucket-editor.component.html',
  styleUrls: ['./bucket-editor.component.scss'],
})
export class BucketEditorComponent implements OnInit, DependsOnBucketData {
  private bucketToEdit: BucketModel = null; // reference
  private editableBucket: BucketModel = null; // gets edited

  pickerOptions = {
    buttons: [
      {
        text: 'Löschen',
        handler: () => this.editableBucket.date = null
      },
      {
        text: 'Fertig',
        handler: (value: any) => this.editableBucket.date = dateformat(new Date(value.year.value + "-" + value.month.value + "-" + value.day.value), "yyyy-mm-dd")
      },
    ]
  }

  constructor(private bucketService: BucketsService, private toastService: ToastService) { }

  ngOnInit() {
    this.initFieldsWithBucketData();
  }

  initFieldsWithBucketData(): void {
    this.bucketService.getSelectedBucket().subscribe((value) => {
      this.bucketToEdit = value;
      this.editableBucket = { ...this.bucketToEdit } // cloning the bucket to edit, to have a work copy
    });
  }


  saveBucket(): Promise<any> {
    let changes = {}

    for (let prop in this.editableBucket) {
      if (this.editableBucket.hasOwnProperty(prop) && this.editableBucket[prop] != this.bucketToEdit[prop]) {
        changes[prop] = this.editableBucket[prop];
      }
    }


    this.toastService.presentToast("Aktualisiere...");

    return this.bucketService.updateBucket(this.editableBucket.id, changes)
      .then(() => {
        this.toastService.presentToast("Das Bucket wurde aktualisiert!");
      })
      .catch((err) => {
        this.toastService.presentToast("Es ist ein Fehler aufgetreten. (ERR-7)");
      });
  }

  deleteBucket(): Promise<any> {
    this.toastService.presentToast("Lösche...");
    return this.bucketService.deleteBucket(this.editableBucket.id)
      .then(() => {
        this.toastService.presentToast("Das Bucket wurde gelöscht!");
      });
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

  formatDate(date: string) {
    return this.editableBucket.date = dateformat(new Date(this.editableBucket.date), "yyyy-mm-dd");;
  }

  wasBucketEdited(): boolean {
    return JSON.stringify(this.editableBucket) !== JSON.stringify(this.bucketToEdit);
  }
}
