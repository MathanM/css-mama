import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlexboxPage } from './flexbox.page';

describe('FlexboxPage', () => {
  let component: FlexboxPage;
  let fixture: ComponentFixture<FlexboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexboxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlexboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
