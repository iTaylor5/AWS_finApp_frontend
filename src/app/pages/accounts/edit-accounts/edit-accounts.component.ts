import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Account } from 'src/app/shared/accounts/account';
import { AccountService } from 'src/app/shared/accounts/accounts-service.service';
import { Category } from 'src/app/shared/category/category';
import { Member } from 'src/app/shared/member/member';
import { Transaction } from 'src/app/shared/transactions/transaction';

@Component({
  selector: 'app-edit-accounts',
  templateUrl: './edit-accounts.component.html',
  styleUrls: ['./edit-accounts.component.scss']
})
export class EditAccountsComponent implements OnInit {

  @Output() addAcc = new EventEmitter
    <{ accName: string, accCurrency: string, accBal: number, memName: string }>();
  @Output() deleteAccount = new EventEmitter<string>();

  @Output() editedAccName = new EventEmitter
    <{ newAccName: string, accID: number }>();

  @Output() editedAccCurrency = new EventEmitter
    <{ newAccCurrency: string, accID: number }>();

  @Output() editedAccBalance = new EventEmitter
    <{ newAccBalance: string, accID: number }>();

  @Output() accNameSelected = new EventEmitter<string>();

  @Input() membersList: Observable<Member[]>;
  @Input() accountsList: Observable<Account[]>;
  @Input() accountSelected: Account;


  deleteAccountForm: FormGroup;
  addAccountForm: FormGroup;
  editAccountForm: FormGroup;
  accountSelectForm: FormGroup;

  editAccountNameForm: FormGroup;
  editAccountCurrencyForm: FormGroup;
  editAccountBalanceForm: FormGroup;

  accountName: string;


  focus;
  focus1;
  focus2;

  constructor(private accService: AccountService) { }

  ngOnInit(): void {

    // FormGroups
    this.addAccountForm = new FormGroup({
      'accountName': new FormControl(null, Validators.required),
      'memberName': new FormControl(null, Validators.required),
      'accountCurrency': new FormControl(null, Validators.required),
      'accountBalance': new FormControl(null, Validators.required)
    });

    this.deleteAccountForm = new FormGroup({
      'category': new FormControl(null, Validators.required)
    });

    this.accountSelectForm = new FormGroup({
      'accNameSelected': new FormControl(null, Validators.required)
    });

    this.editAccountForm = new FormGroup({
      'accNameEdited': new FormControl(null, Validators.required),
      'currencyEdited': new FormControl(null, Validators.required),
      'accBalanceEdited': new FormControl(null, Validators.required),
    });

    this.editAccountNameForm = new FormGroup({
      'newAccountName': new FormControl(null, Validators.required)
    });

    this.editAccountCurrencyForm = new FormGroup({
      'newCurrency': new FormControl(null, Validators.required)
    });

    this.editAccountBalanceForm = new FormGroup({
      'newBalance': new FormControl(null, Validators.required)
    });

    // this.accountSelected = this.refreshAccountSelected.pipe(switchMap(_ => this.getAccountSelected(this.accountName)));

    // subscribing for 2-way binding.
    this.accountSelectForm.get("accNameSelected")?.valueChanges.subscribe(
      accNameSelect => {
        // this.accountName = accNameSelect;
        // this.accService.getAccount(accNameSelect).subscribe(
        //   data => this.accountSelected = data
        //   // () => this.refreshAccountSelected.next(false)
        // )
        // this.getAccountSelected(accNameSelect).subscribe(
        //   () => console.log("found")
        // )
        this.accNameSelected.emit(accNameSelect);
      }
    );
  }

  getAccountSelected(name: string): Observable<Account> {
    return this.accService.getAccount(name);
  }

  addAccount() {
    let accountName = this.addAccountForm.get('accountName')?.value;
    let accountCurrency = this.addAccountForm.get('accountCurrency')?.value;
    let accountBalance = this.addAccountForm.get('accountBalance')?.value;
    let memberName = this.addAccountForm.get('memberName')?.value;

    let accObj = { accName: accountName, accCurrency: accountCurrency, accBal: accountBalance, memName: memberName };
    this.addAcc.emit(accObj);

  }

  deleteCategory() {
    const accName = this.deleteAccountForm.get('category')?.value;
    console.log("in the delete category account's name to be deleted: " + accName);
    this.deleteAccount.emit(accName)
  }

  selectAccount() {
    const accName = this.editAccountForm.get('accName');
    console.log("In the edit-accounts form. Current account selected it: " + accName);
  }

  editAccountName() {
    let newAccName = this.editAccountNameForm.get("newAccountName")?.value;
    // let accSelected;

    // this.accountSelected.subscribe(
    //   data => accSelected = data
    // )

    let editedAccount = { newAccName: newAccName, accID: this.accountSelected.id };
    console.log("IN editAccountName() edit-accounts-component");
    console.log("newAccName: " + newAccName
      + " accID:" + this.accountSelected.id);
    this.editedAccName.emit(editedAccount);

  }

  editAccountCurrency() {
    let newAccCurrency = this.editAccountCurrencyForm.get("newCurrency")?.value;

    // let accSelected;

    // this.accountSelected.subscribe(
    //   data => accSelected = data
    // )

    let editedAccount = { newAccCurrency: newAccCurrency, accID: this.accountSelected.id };
    console.log("IN editAccountName() edit-accounts-component");
    console.log("newAccName: " + newAccCurrency
      + " accID:" + this.accountSelected.id);
    this.editedAccCurrency.emit(editedAccount);
  }

  // getAccount() {
  //   this.accountSelected.subscribe(
  //     data => this.accountSelected = data
  //   )
  // }

  editAccountBalance() {
    let newAccBalance = this.editAccountBalanceForm.get("newBalance")?.value;
    // let newAccCurrency = this.editAccountCurrencyForm.get("newCurrency")?.value;

    // let accSelected;

    // this.accountSelected.subscribe(
    //   data => accSelected = data
    // )

    let editedAccount = { newAccBalance: newAccBalance, accID: this.accountSelected.id };
    console.log("IN editAccountBalance() edit-accounts-component");
    console.log("newAccBalance: " + newAccBalance
      + " accID:" + this.accountSelected.id);
    this.editedAccBalance.emit(editedAccount);
  }

}
