import 'zone.js/dist/zone-testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeUiComponent } from './trade-ui.component';

describe('TradeUiComponent', () => {
  let component: TradeUiComponent;
  let fixture: ComponentFixture<TradeUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
