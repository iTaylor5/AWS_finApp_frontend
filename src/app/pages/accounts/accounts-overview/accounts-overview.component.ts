import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Account } from 'src/app/shared/accounts/account';
import { AccountService } from 'src/app/shared/accounts/accounts-service.service';

@Component({
  selector: 'app-accounts-overview',
  templateUrl: './accounts-overview.component.html',
  styleUrls: ['./accounts-overview.component.scss']
})
export class AccountsOverviewComponent implements OnInit {
  @Input() accountsList: Observable<Account[]>;

  // refreshCategoryList = new BehaviorSubject<boolean>(true);
  // accountsList: Observable<Account[]>;

  constructor(private accService: AccountService) { }

  ngOnInit(): void {
    // this.accountsList = this.refreshCategoryList.pipe(switchMap(_ => this.getAccountsList()));
  }

  // getAccountsList(): Observable<Account[]> {
  //   return this.accService.getAccountList();
  // }
}
