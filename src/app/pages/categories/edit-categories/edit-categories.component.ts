import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/category/category';
import { CategoryService } from 'src/app/shared/category/category.service';

import swal from "sweetalert2";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../settings/component/modal/modal.component';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-category-settings',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {
  @Input() categories: Observable<Category[]>;
  @Output() addNewCat = new EventEmitter<string>();
  @Output() deleteCat = new EventEmitter<string>();

  // refreshCategoryList = new BehaviorSubject<boolean>(true);

  deleteCategoryForm: FormGroup;
  addCategoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private changeDetection: ChangeDetectorRef) { }


  ngOnInit(): void {

    this.deleteCategoryForm = new FormGroup({
      'category': new FormControl(null, Validators.required)
    });

    this.addCategoryForm = new FormGroup({
      'category': new FormControl(null, Validators.required)
    });

  }

  listCategory(): Observable<Category[]> {
    return this.categoryService.getCategories();
  }

  addCategory() {
    let categoryName = this.addCategoryForm.get('category')?.value;
    this.addNewCat.emit(categoryName);
  }

  deleteCategory() {
    const categoryName = this.deleteCategoryForm.get('category')?.value;
    this.deleteCat.emit(categoryName);
  }

  public trackItem(index: number, cat: Category) {
    return cat.id;
  }
}
