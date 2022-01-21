import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/shared/transactions/transaction';
import { TransactionsService } from 'src/app/shared/transactions/transactions.service';


import { PageEvent } from '@angular/material/paginator';
import { createDate } from 'ngx-bootstrap/chronos/create/date-from-array';
import { PagedResponse } from './paged-response';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Page } from 'src/app/pagination/page';
import { CustomPaginationService } from 'src/app/pagination/services/custom-pagination.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  page: Page<Transaction> = new Page();

  transactions: Transaction[];

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(
    private transactionService: TransactionsService,
    private http: HttpClient,
    private paginationService: CustomPaginationService) { }

  ngOnInit(): void {

  }

}

interface GetResponseTransactions {
  content: Transaction[];
}

