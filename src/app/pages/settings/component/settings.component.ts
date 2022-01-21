import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import swal from "sweetalert2";

import { Category } from 'src/app/shared/category/category';
import { CategoryService } from 'src/app/shared/category/category.service';
import { Subcategory } from 'src/app/shared/subcategory/subcategory';
import { SubcategoryService } from 'src/app/shared/subcategory/subcategory.service';
import { Account } from 'src/app/shared/accounts/account';
import { AccountService } from 'src/app/shared/accounts/accounts-service.service';
import { MemberService } from 'src/app/shared/member/member.service';
import { Transaction } from 'src/app/shared/transactions/transaction';
import { Member } from 'src/app/shared/member/member';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  // refreshCategoryList = new BehaviorSubject<boolean>(true);
  // refreshAccountList = new BehaviorSubject<boolean>(true);
  // refreshMembersList = new BehaviorSubject<boolean>(true);

  categoryList: Observable<Category[]>;
  // accountsList: Observable<Account[]>;
  membersList: Observable<Member[]>;

  // accountSelected: Account;
  // accName: string;


  // membersList: Member[];
  collapseOne = true;
  collapseThree = true;
  collapseTwo = true;

  subcategory: Subcategory;
  addSubcategoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private accService: AccountService,
    private memberService: MemberService,
    private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.categoryList = this.refreshCategoryList.pipe(switchMap(_ => this.listCategory()));
    // this.accountsList = this.refreshAccountList.pipe(switchMap(_ => this.listAccounts()));
    // this.membersList = this.refreshMembersList.pipe(switchMap(_ => this.getMembers()));
  }

  // getAccountSelected(name: string) {
  //   return this.accService.getAccount(name).subscribe
  //     (data => { this.accountSelected = data, this.accName = name })
  // }

  // getMembers() {
  //   // this.memberService.getMembers().subscribe(
  //   //   data => {
  //   //     this.membersList = data, console.log(this.membersList)
  //   //   });
  //   return this.memberService.getMembers();
  // }

  // addSubcategory(item: { categoryName: string, subcategoryName: string }) {

  //   let categoryName = item.categoryName;
  //   let subcategoryName = item.subcategoryName;

  //   console.log("Name of the new subcategory to be submitted is: " + subcategoryName);
  //   console.log("The name of the category it wiil be added to is: " + categoryName);

  //   this.subcategoryService.addSubcategory(subcategoryName, categoryName).subscribe(
  //     data => {
  //       console.log("Category added: " + data),
  //         this.refreshCategoryList.next(false);
  //     });
  // }

  // deleteSubcategory(item: { categoryName: string, subcategoryName: string }) {

  //   let subcategoryName = item.subcategoryName;

  //   console.log("Category from where the subcategory belongs is: " + item.categoryName);
  //   console.log("Subcategory to be deleted is: " + subcategoryName);

  //   let subcategory: Subcategory;

  //   this.subcategoryService.getSubcategoryByName(subcategoryName).subscribe(
  //     data => {
  //       subcategory = data;
  //       this.subcategoryService.deleteSubcategory(subcategory.id).subscribe(
  //         () => this.refreshCategoryList.next(false)
  //       );
  //     });
  // }

  listCategory(): Observable<Category[]> {
    return this.categoryService.getCategories();
  }

  // listAccounts(): Observable<Account[]> {
  //   return this.accService.getAccountList();
  // }

  // addAccount(accObj: { accName: string, accCurrency: string, accBal: number, memName: string }) {
  //   console.log("Account to be added is: " + accObj.accName);

  //   let member;

  //   let newAccObj: Account;

  //   this.memberService.getMember(accObj.memName).subscribe(
  //     data => {
  //       member = data,
  //         console.log(data),
  //         newAccObj = new Account(accObj.accName, accObj.accCurrency, accObj.accBal, member, new Array);

  //       this.accService.addAccount(newAccObj).subscribe(
  //         data => {
  //           console.log(data),
  //             this.refreshAccountList.next(false)
  //         });
  //     }
  //   );
  // }

  // addCategory(categoryName: string) {
  //   console.log("Category to be added is: " + categoryName);

  //   this.categoryService.addCategory(categoryName).subscribe({
  //     next: (v: Category) => {
  //       console.log("Added: " + v),
  //         this.successShowSwal(v.name),
  //         this.changeDetection.markForCheck(), this.changeDetection.detectChanges()

  //     },
  //     // console.log(this.categoryList),this.changeDetection.markForCheck(), this.changeDetection.detectChanges(),
  //     error: (e) => { console.log(e), this.failedshowSwal() },
  //     complete: () => {
  //       console.info('Complete'),
  //         this.refreshCategoryList.next(false);
  //     }
  //   });
  // }

  // deleteCategory(categoryName: string) {
  //   // const categoryName = this.deleteCategoryForm.get('category')?.value;

  //   console.log("Category wished to be delete is: " + categoryName);

  //   let categoryToBeDeleted: Category;

  //   this.categoryService.getCategoryFromName(categoryName).subscribe(
  //     (data) => {
  //       categoryToBeDeleted = data;
  //       console.log("Let's check the data returned: " + data);
  //       this.categoryService.deleteCategory(categoryToBeDeleted.id).subscribe(
  //         () => {
  //           this.changeDetection.markForCheck(),
  //             this.changeDetection.detectChanges(),
  //             this.refreshCategoryList.next(false);
  //         }
  //       )
  //     }
  //   )
  // }

  // deleteAccount(accName: string) {
  //   console.log("In the deleteAccount in settings.componenet. Account to be deleted is: " + accName);
  //   this.accService.deleteMemberbyName(accName).subscribe(
  //     {
  //       next: data => {
  //         this.refreshAccountList.next(false);
  //         this.successShowSwal('Delete successful');
  //       },
  //       error: error => {
  //         console.error('There was an error!', error);
  //         this.failedshowSwal();
  //       }
  //     }
  //   )
  // }

  // submitEditedAccountName(editedAcc: { newAccName: string, accID: number }) {
  //   console.log("In submitEditedAccount() in settings-component.");
  //   console.log(editedAcc);

  //   this.accService.patchAccountName(editedAcc.accID, editedAcc.newAccName).subscribe(
  //     () => { console.log("Edited!!"), this.refreshAccountList.next(false), this.getAccountSelected(editedAcc.newAccName) }
  //   )
  // }

  // submitEditedAccountCurrency(editedAcc: { newAccCurrency: string, accID: number }) {
  //   console.log("In submitEditedAccount() in settings-component.");
  //   console.log(editedAcc);

  //   this.accService.patchAccountCurrency(editedAcc.accID, editedAcc.newAccCurrency).subscribe(
  //     () => { console.log("Edited!!"), this.refreshAccountList.next(false), this.getAccountSelected(this.accName) }
  //   )
  // }

  // submitEditedAccountBalance(editedAcc: { newAccBalance: string, accID: number }) {
  //   console.log("In submitEditedAccount() in settings-component.");
  //   console.log(editedAcc);

  //   this.accService.patchAccountBalance(editedAcc.accID, editedAcc.newAccBalance).subscribe(
  //     () => { console.log("Edited!!"), this.refreshAccountList.next(false), this.getAccountSelected(this.accName) }
  //   )
  // }

  // removeSubcategory(name: string) {
  //   console.log("In remover! The name of the subcategory to be deleted is: " + name);
  //   let subcat;

  //   const confirm = window.confirm('Do you really want to remove this ' + name + ' subcategory?'
  //     + "By doing so all transactions related to this subcategory will also be removed.");

  //   if (confirm) {
  //     this.subcategoryService.getSubcategoryByName(name).subscribe(
  //       data => {
  //         subcat = data;
  //         console.log(subcat);
  //         this.subcategoryService.deleteSubcategory(subcat.id).subscribe(
  //           data => {
  //             console.log("Deleted subcategory "),
  //               this.changeDetection.detectChanges(),
  //               this.refreshCategoryList.next(false)
  //           }
  //         )
  //       }
  //     );
  //   } else {
  //     console.log("OK Canceled")
  //   }
  // }

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
