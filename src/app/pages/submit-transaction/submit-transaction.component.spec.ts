import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTransactionComponent } from './submit-transaction.component';

describe('SubmitTransactionComponent', () => {
  let component: SubmitTransactionComponent;
  let fixture: ComponentFixture<SubmitTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
