import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Account } from 'src/app/shared/accounts/account';
import { AccountService } from 'src/app/shared/accounts/accounts-service.service';
import { Member } from 'src/app/shared/member/member';
import { MemberService } from 'src/app/shared/member/member.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  refreshAccountList = new BehaviorSubject<boolean>(true);
  refreshMembersList = new BehaviorSubject<boolean>(true);

  accountsList: Observable<Account[]>;
  membersList: Observable<Member[]>;

  accountSelected: Account;
  accName: string;

  constructor(private accService: AccountService,
    private memberService: MemberService) { }

  ngOnInit(): void {
    this.accountsList = this.refreshAccountList.pipe(switchMap(_ => this.listAccounts()));
    this.membersList = this.refreshMembersList.pipe(switchMap(_ => this.getMembers()));
  }

  listAccounts(): Observable<Account[]> {
    return this.accService.getAccountList();
  }

  addAccount(accObj: { accName: string, accCurrency: string, accBal: number, memName: string }) {
    console.log("Account to be added is: " + accObj.accName);

    let member;

    let newAccObj: Account;

    this.memberService.getMember(accObj.memName).subscribe(
      data => {
        member = data,
          console.log(data),
          newAccObj = new Account(accObj.accName, accObj.accCurrency, accObj.accBal, member, new Array);

        this.accService.addAccount(newAccObj).subscribe(
          data => {
            console.log(data),
              this.refreshAccountList.next(false)
          });
      }
    );
  }

  deleteAccount(accName: string) {
    console.log("In the deleteAccount in settings.componenet. Account to be deleted is: " + accName);
    this.accService.deleteMemberbyName(accName).subscribe(
      {
        next: data => {
          this.refreshAccountList.next(false);
          this.successShowSwal('Delete successful');
        },
        error: error => {
          console.error('There was an error!', error);
          this.failedshowSwal();
        }
      }
    )
  }

  getAccountSelected(name: string) {
    return this.accService.getAccount(name).subscribe
      (data => { this.accountSelected = data, this.accName = name })
  }

  getMembers() {
    // this.memberService.getMembers().subscribe(
    //   data => {
    //     this.membersList = data, console.log(this.membersList)
    //   });
    return this.memberService.getMembers();
  }

  submitEditedAccountName(editedAcc: { newAccName: string, accID: number }) {
    console.log("In submitEditedAccount() in settings-component.");
    console.log(editedAcc);

    this.accService.patchAccountName(editedAcc.accID, editedAcc.newAccName).subscribe(
      () => { console.log("Edited!!"), this.refreshAccountList.next(false), this.getAccountSelected(editedAcc.newAccName) }
    )
  }

  submitEditedAccountCurrency(editedAcc: { newAccCurrency: string, accID: number }) {
    console.log("In submitEditedAccount() in settings-component.");
    console.log(editedAcc);

    this.accService.patchAccountCurrency(editedAcc.accID, editedAcc.newAccCurrency).subscribe(
      () => { console.log("Edited!!"), this.refreshAccountList.next(false), this.getAccountSelected(this.accName) }
    )
  }

  submitEditedAccountBalance(editedAcc: { newAccBalance: string, accID: number }) {
    console.log("In submitEditedAccount() in settings-component.");
    console.log(editedAcc);

    this.accService.patchAccountBalance(editedAcc.accID, editedAcc.newAccBalance).subscribe(
      () => { console.log("Edited!!"), this.refreshAccountList.next(false), this.getAccountSelected(this.accName) }
    )
  }

  successShowSwal(result: string) {
    let stored = "This transaction with the description: " + result + " was saved successfully"
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
