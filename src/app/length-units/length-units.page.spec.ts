import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LengthUnitsPage } from './length-units.page';

describe('LengthUnitsPage', () => {
  let component: LengthUnitsPage;
  let fixture: ComponentFixture<LengthUnitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LengthUnitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LengthUnitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
