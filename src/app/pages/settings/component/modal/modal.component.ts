import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/shared/category/category';
import { ModalModule } from 'ngx-bootstrap/modal';



// export class User{
//   name:string;
// }

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() public cat: Category;
  // @ViewChild('staticModal') public staticModal:ModalDirective;

  // private modalService: NgbModal
  constructor() { }

  // public user = {
  //   name: 'Izzat Nadiri',
  //   age: 26
  // }

  ngOnInit(): void {
    console.log(this.cat);
  }


}
