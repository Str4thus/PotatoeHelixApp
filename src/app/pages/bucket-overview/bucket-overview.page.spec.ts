import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BucketOverviewPage } from './bucket-overview.page';

describe('BucketOverviewPage', () => {
  let component: BucketOverviewPage;
  let fixture: ComponentFixture<BucketOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketOverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BucketOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
