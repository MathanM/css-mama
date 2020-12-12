import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterPopComponent } from './filter-pop.component';

describe('FilterPopComponent', () => {
  let component: FilterPopComponent;
  let fixture: ComponentFixture<FilterPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPopComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
