import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectorsPage } from './selectors.page';

describe('SelectorsPage', () => {
  let component: SelectorsPage;
  let fixture: ComponentFixture<SelectorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
