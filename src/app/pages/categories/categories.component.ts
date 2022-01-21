import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Category } from 'src/app/shared/category/category';
import { CategoryService } from 'src/app/shared/category/category.service';
import { Subcategory } from 'src/app/shared/subcategory/subcategory';
import { SubcategoryService } from 'src/app/shared/subcategory/subcategory.service';

import swal from "sweetalert2";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  refreshCategoryList = new BehaviorSubject<boolean>(true);

  categoryList: Observable<Category[]>;

  constructor(private categoryService: CategoryService,
    private subcategoryService: SubcategoryService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.categoryList = this.refreshCategoryList.pipe(switchMap(_ => this.listCategory()));
  }

  addCategory(categoryName: string) {
    console.log("Category to be added is: " + categoryName);

    this.categoryService.addCategory(categoryName).subscribe({
      next: (v: Category) => {
        console.log("Added: " + v),
          this.successShowSwal(v.name),
          this.changeDetection.markForCheck(), this.changeDetection.detectChanges()

      },
      // console.log(this.categoryList),this.changeDetection.markForCheck(), this.changeDetection.detectChanges(),
      error: (e) => { console.log(e), this.failedshowSwal() },
      complete: () => {
        console.info('Complete'),
          this.refreshCategoryList.next(false);
      }
    });
  }

  addSubcategory(item: { categoryName: string, subcategoryName: string }) {

    let categoryName = item.categoryName;
    let subcategoryName = item.subcategoryName;

    console.log("Name of the new subcategory to be submitted is: " + subcategoryName);
    console.log("The name of the category it wiil be added to is: " + categoryName);

    this.subcategoryService.addSubcategory(subcategoryName, categoryName).subscribe(
      data => {
        console.log("Category added: " + data),
          this.refreshCategoryList.next(false);
      });
  }

  deleteSubcategory(item: { categoryName: string, subcategoryName: string }) {

    let subcategoryName = item.subcategoryName;

    console.log("Category from where the subcategory belongs is: " + item.categoryName);
    console.log("Subcategory to be deleted is: " + subcategoryName);

    let subcategory: Subcategory;

    this.subcategoryService.getSubcategoryByName(subcategoryName).subscribe(
      data => {
        subcategory = data;
        this.subcategoryService.deleteSubcategory(subcategory.id).subscribe(
          () => this.refreshCategoryList.next(false)
        );
      });
  }

  deleteCategory(categoryName: string) {
    // const categoryName = this.deleteCategoryForm.get('category')?.value;

    console.log("Category wished to be delete is: " + categoryName);

    let categoryToBeDeleted: Category;

    this.categoryService.getCategoryFromName(categoryName).subscribe(
      (data) => {
        categoryToBeDeleted = data;
        console.log("Let's check the data returned: " + data);
        this.categoryService.deleteCategory(categoryToBeDeleted.id).subscribe(
          () => {
            // this.changeDetection.markForCheck(),
            //   this.changeDetection.detectChanges(),
            this.refreshCategoryList.next(false);
          }
        )
      }
    )
  }

  listCategory(): Observable<Category[]> {
    return this.categoryService.getCategories();
  }

  removeSubcategory(name: string) {
    console.log("In remover! The name of the subcategory to be deleted is: " + name);
    let subcat;

    const confirm = window.confirm('Do you really want to remove this ' + name + ' subcategory?'
      + "By doing so all transactions related to this subcategory will also be removed.");

    if (confirm) {
      this.subcategoryService.getSubcategoryByName(name).subscribe(
        data => {
          subcat = data;
          console.log(subcat);
          this.subcategoryService.deleteSubcategory(subcat.id).subscribe(
            data => {
              console.log("Deleted subcategory "),
                // this.changeDetection.detectChanges(),
                this.refreshCategoryList.next(false)
            }
          )
        }
      );
    } else {
      console.log("OK Canceled")
    }
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
