import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BucketAdderComponent } from './bucket-adder.component';

describe('BucketAdderComponent', () => {
  let component: BucketAdderComponent;
  let fixture: ComponentFixture<BucketAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketAdderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BucketAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
