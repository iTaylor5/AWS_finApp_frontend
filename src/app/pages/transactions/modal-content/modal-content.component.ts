import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from 'src/app/shared/transactions/transaction';


@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

  @Input() public transaction: Transaction;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  transactionSelectForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  passBack() {
    this.activeModal.close(this.transaction);
  }

}
