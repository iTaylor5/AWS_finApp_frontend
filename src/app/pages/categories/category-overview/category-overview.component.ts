import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/category/category';
import { CategoryService } from 'src/app/shared/category/category.service';
import { SubcategoryService } from 'src/app/shared/subcategory/subcategory.service';

@Component({
  selector: 'app-category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.scss']
})
export class CategoryOverviewComponent implements OnInit {
  // @Input() categories: Category[];
  @Input() categories: Observable<Category[]>;
  @Output() addNewSubCat = new EventEmitter<string>();
  @Output() deleteSubCat = new EventEmitter<string>();

  listOfCategories: Category[];

  constructor(private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCategories();
  }

  onAdded(name: any, cat: string) {
    this.subcategoryService.addSubcategory(name.value, cat).subscribe(
      data => {
        console.log("Category added: " + data),
          console.log('Fire Added :: add subcategory named:  ' + name.value + " to category " + cat)
      }
    )
  }

  public trackItem(index: number, cat: Category) {
    return cat.id;
  }

  remover(item, index) {
    this.deleteSubCat.emit(item);
    // console.log("In remover! The name of the subcategory to be deleted is: " + item);
    // let subcat;

    // const confirm = window.confirm('Do you really want to remove this ' + item + ' subcategory?'
    //   + "By doing so all transactions related to this subcategory will also be removed.");

    // if (confirm) {
    //   this.subcategoryService.getSubcategoryByName(item).subscribe(
    //     data => {
    //       subcat = data;
    //       console.log(subcat);
    //       this.subcategoryService.deleteSubcategory(subcat.id).subscribe(
    //         data => {
    //           console.log("Deleted subcategory "),
    //             this.changeDetection.detectChanges();
    //         }
    //       )
    //     }
    //   );
    // } else {
    //   console.log("OK Canceled")
    // }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => this.listOfCategories = data
    );
  }
  customTB(item, index) {
    return `${item.id}-${index}`;
  }

  title = 'Tour of Heroes';
  heroes = [
    new Hero(1, 'Windstorm'),
    new Hero(13, 'Bombasto'),
    new Hero(15, 'Magneta'),
    new Hero(20, 'Tornado')
  ];
  myHero = this.heroes[0];

  onAddClick() {
    console.log('clicked');
    this.heroes.push(new Hero(12, 'Jagan'));
    console.log(this.heroes);
  }

}

class Hero {
  constructor(
    public id: number,
    public name: string) { }
}