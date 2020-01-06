import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BucketAddPage } from './bucket-add.page';

describe('BucketAddPage', () => {
  let component: BucketAddPage;
  let fixture: ComponentFixture<BucketAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BucketAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
