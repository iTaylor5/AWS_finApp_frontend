import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/category/category';
import { CategoryService } from 'src/app/shared/category/category.service';
import { Subcategory } from 'src/app/shared/subcategory/subcategory';
import { SubcategoryService } from 'src/app/shared/subcategory/subcategory.service';

@Component({
  selector: 'app-edit-subcategories',
  templateUrl: './edit-subcategories.component.html',
  styleUrls: ['./edit-subcategories.component.scss']
})
export class EditSubcategoriesComponent implements OnInit {

  @Input() categories: Observable<Category[]>;
  @Output() addNewSubCat = new EventEmitter<{ categoryName: string, subcategoryName: string }>();
  @Output() deleteSubCat = new EventEmitter<{ categoryName: string, subcategoryName: string }>();

  deleteSubcategoryForm: FormGroup;
  addSubcategoryForm: FormGroup;
  category: Category;
  subCategoryList: Subcategory[];

  constructor(private categoryService: CategoryService,
    private subcategoryService: SubcategoryService) { }

  ngOnInit(): void {

    this.addSubcategoryForm = new FormGroup({
      'subcategoryName': new FormControl(null, Validators.required),
      'category': new FormControl(null, Validators.required),
    });

    this.deleteSubcategoryForm = new FormGroup({
      'category': new FormControl(null, Validators.required),
      'subcategory': new FormControl(null, Validators.required)
    });

    this.deleteSubcategoryForm.get('category')?.valueChanges.subscribe(
      subCatSelected => this.getCategoryFromName(subCatSelected)
    );
  }

  getCategoryFromName(name: string) {
    console.log("In get getCategoryFromName. -- category name = " + name);

    this.categoryService.getCategoryFromName(name).subscribe(
      (data) => {
        this.category = data;
        this.subCategoryList = this.category.transactionSubcategories;
      }
    )
  }

  addSubcategory() {

    let categoryName = this.addSubcategoryForm.get('category')?.value;
    let subcategoryName = this.addSubcategoryForm.get('subcategoryName')?.value;
    this.addNewSubCat.emit({ categoryName, subcategoryName });

  }

  deleteSubcategory() {
    let subcategoryName = this.deleteSubcategoryForm.get('subcategory')?.value;
    let categoryName = this.deleteSubcategoryForm.get('category')?.value;
    console.log("Category from where the subcategory belongs is: " + categoryName);
    console.log("Subcategory to be deleted is: " + subcategoryName);
    this.deleteSubCat.emit({ categoryName, subcategoryName })
  }

}
