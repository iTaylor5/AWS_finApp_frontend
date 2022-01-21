import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Page } from 'src/app/pagination/page';
import { CustomPaginationService } from 'src/app/pagination/services/custom-pagination.service';
import { Transaction } from 'src/app/shared/transactions/transaction';
import { TransactionsService } from 'src/app/shared/transactions/transactions.service';

import swal from "sweetalert2";

import { ModalContentComponent } from '../modal-content/modal-content.component';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-overal-transactions',
  templateUrl: './overal-transactions.component.html',
  styleUrls: ['./overal-transactions.component.scss']
})
export class OveralTransactionsComponent implements OnInit {

  refreshTransactionList = new BehaviorSubject<boolean>(true);

  page: Page<Transaction> = new Page();
  transactions: Transaction[];
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  closeResult = '';

  constructor(private transactionService: TransactionsService,
    private http: HttpClient,
    private paginationService: CustomPaginationService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }


  ngOnInit(): void {
    this.getData();
    this.transactions = this.page.content;
  }

  public getData(): void {
    this.transactionService.getPage(this.page.pageable)
      .subscribe(page => this.page = page);
  }

  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getData();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.getData();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.getData();
  }

  edit(id: number) {
    console.log("Clicked! id: " + id);
  }

  openModal(obj: Transaction) {

    let modalRef;
    // let transaction: Transaction;

    console.log(obj);

    modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.transaction = obj;

    modalRef.result.then((result) => {
      console.log("Edited result is : " + result);
      this.transactionService.putTransaction(result).subscribe(
        data => console.log("This transaction has been added: " + data)
      )
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  showSwal(transaction: Transaction) {
    console.log(transaction);
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        customClass: {
          cancelButton: "btn btn-danger",
          confirmButton: "btn btn-success mr-1",
        },
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false
      })
      .then(result => {
        if (result.value) {

          this.transactionService.deleteTransaction(transaction.id).subscribe(
            () => swal.fire({
              title: "Deleted!",
              text: "Your transaction has been deleted.",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-success",
              },
              buttonsStyling: false
            })
          );

        }
      })
  }

}
