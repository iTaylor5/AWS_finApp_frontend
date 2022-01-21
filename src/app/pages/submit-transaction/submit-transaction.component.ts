import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



import { Account } from 'src/app/shared/accounts/account';
import { AccountService } from 'src/app/shared/accounts/accounts-service.service';
import { Category } from 'src/app/shared/category/category';
import { CategoryService } from 'src/app/shared/category/category.service';
import { Member } from 'src/app/shared/member/member';

import { Subcategory } from 'src/app/shared/subcategory/subcategory';
import { SubcategoryService } from 'src/app/shared/subcategory/subcategory.service';
import { Transaction } from 'src/app/shared/transactions/transaction';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { PostTransaction } from 'src/app/shared/post-transaction/post-transaction';
import { MemberService } from 'src/app/shared/member/member.service';
import { catchError, map, Observable, throwError } from 'rxjs';

import swal from "sweetalert2";
import { TransactionsService } from 'src/app/shared/transactions/transactions.service';

@Component({
  selector: 'app-submit-transaction',
  templateUrl: './submit-transaction.component.html',
  styleUrls: ['./submit-transaction.component.scss']
})
export class SubmitTransactionComponent implements OnInit {

  transactionForm: FormGroup;

  categoryList: Category[];

  categoryNameSelected: string;
  category: Category;

  subcategoryList: Subcategory[];
  subcategorySelected: Subcategory;

  accounts: Account[];
  account: Account;
  members: Member[];
  member: Member = new Member();

  newTransaction: Transaction;

  events: string[] = [];

  date: Date = new Date();

  constructor(private categoryService: CategoryService,
    private accountService: AccountService,
    private memberService: MemberService,
    private tranactionService: TransactionsService) { }

  ngOnInit(): void {
    this.listCategory();
    this.listAccounts();
    this.listMembers();

    this.transactionForm = new FormGroup({
      // accountName: new FormControl(),
      'amount': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'categoryEnter': new FormControl(null, Validators.required),
      'subcategory': new FormControl(null, Validators.required),
      'member': new FormControl(null, Validators.required),
      'account': new FormControl(null, Validators.required),
      'date_created': new FormControl(null, Validators.required)

    });

    this.transactionForm.get('categoryEnter')?.valueChanges.subscribe(
      categoryNameSelected => this.getCategoryFromName(categoryNameSelected)
    );
    this.transactionForm.get('member')?.valueChanges.subscribe(
      memberNameSelected => this.getMember(memberNameSelected)
    );
    this.transactionForm.get('account')?.valueChanges.subscribe(
      accNameSelected => this.getAccount(accNameSelected)
    );
    this.transactionForm.get('subcategory')?.valueChanges.subscribe(
      subCatSelected => this.getSubcategoryByName(subCatSelected)
    );
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.printDateEvent();
  }

  printDateEvent() {
    console.log(this.events);
  }

  getCategoryFromName(name: string) {
    console.log("In get getCategoryFromName. -- category name = " + name);

    this.categoryService.getCategoryFromName(name).subscribe(
      (data) => {
        this.category = data;
        this.subcategoryList = this.category.transactionSubcategories;
        console.log("Lets check subcategories....");
        console.log(this.subcategoryList);
        // this.getSubcategory()
      }
    )
  }

  getMember(name: string) {
    this.memberService.getMember(name).subscribe(
      data => {
        this.member = data;
        // print();
      }
    )
  }

  // getSubcategory() {
  //   this.categoryService.getSubcategories(this.category).subscribe(
  //     data => {
  //       this.subcategoryList = data;
  //     }
  //   )
  // }

  getSubcategoryByName(name: string) {
    console.log("In getSubcategoryByName. -- name = " + name);

    // this.subcategoryService.getSubcategoryByName(name).subscribe(
    //   data => {
    //     this.subcategorySelected = data;
    //   }
    // )

    this.category.transactionSubcategories.forEach(element => {
      if (element.name === name) {
        this.subcategorySelected = element;
      }
    });

    console.log("let's see if the subcategory was found.");
    console.log(this.subcategorySelected);
  }

  listCategory() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categoryList = data;
        console.log(data);
      }
    )
  }

  listAccounts() {
    this.accountService.getAccountList().subscribe(
      data => {
        this.accounts = data;
      }
    )
  }

  listMembers() {
    this.memberService.getMembers().subscribe(
      data => {
        this.members = data;
      }
    )
  }


  getAccount(name: string) {
    this.accountService.getAccount(name).subscribe(
      data => {
        this.account = data;
      }
    )
  }


  onSubmit() {

    console.log(JSON.stringify(this.transactionForm.getRawValue()));

    let postTransact = new PostTransaction(
      this.transactionForm.get('amount')?.value,
      this.transactionForm.get('description')?.value,
      this.transactionForm.get('subcategory')?.value,
      this.transactionForm.get('member')?.value,
      this.transactionForm.get('date_created')?.value,
      this.transactionForm.get('account')?.value
    );

    // console.log("## Date ##");
    // const date = postTransact.date;
    // console.log(date);

    // const basUrl = "http://localhost:8080/api/transactions/add";

    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // }

    // this.httpClient.post(basUrl, postTransact, httpOptions).subscribe(
    //   (val) => {
    //     console.log("POST call successful value returned in body",
    //       val);
    //     this.successShowSwal(val);
    //   },
    //   response => {
    //     console.log("POST call in error", response);
    //     this.failedshowSwal();
    //   },
    //   () => {
    //     console.log("The POST observable is now completed.");
    //   });

    // (val) => {
    //   console.log("POST call successful value returned in body",
    //     val);
    //   this.successShowSwal(val);
    // },
    // response => {
    //   console.log("POST call in error", response);
    //   this.failedshowSwal();
    // },
    // () => {
    //   console.log("The POST observable is now completed.");
    // });

    this.tranactionService.addTransaction(postTransact).subscribe({
      next: (val) => {
        console.log("POST call successful value returned in body" + val);
        this.successShowSwal(val);
      },
      error: (response) => {
        console.log("POST call in error", response);
        this.failedshowSwal();
      },
      complete: () => {
        console.log("The POST observable is now completed.");
      }
    });

  }

  setSubcategory(categoryName: string) {
    console.log("cat = " + this.categoryNameSelected)
  }

  successShowSwal(result) {

    let stored = "This transaction with the description: " + result.description + " was saved successfully"

    swal.fire({
      title: "Successfully Uploaded",
      text: stored,
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-success",
      },
      icon: "success"
    })
  }

  failedshowSwal() {
    swal.fire({
      title: "Unsuccessful",
      text: "Unabled to save the transaction. Ensure all details were added correctly",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-success",
      },
      icon: "error"
    })
  }

}