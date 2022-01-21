import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OveralTransactionsComponent } from './overal-transactions.component';

describe('OveralTransactionsComponent', () => {
  let component: OveralTransactionsComponent;
  let fixture: ComponentFixture<OveralTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OveralTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OveralTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
