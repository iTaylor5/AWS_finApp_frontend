import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Account } from 'src/app/shared/accounts/account';
import { Member } from 'src/app/shared/member/member';
import { MemberService } from 'src/app/shared/member/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @Input() membersList: Observable<Member[]>;

  focus;
  focus1;
  focus2;

  memberSelectForm: FormGroup;
  editMemberForm: FormGroup;
  memberName: string;
  selectedMember: Member;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {

    this.memberSelectForm = new FormGroup({
      'memberName': new FormControl(null, Validators.required)
    });

    this.editMemberForm = new FormGroup({
      'newName': new FormControl(null, Validators.required),
    });


    this.memberSelectForm.get("memberName")?.valueChanges.subscribe(
      data => {
        this.memberName = data, this.findSelectedMember(data)
      }
    )

  }

  findSelectedMember(name: string) {
    this.memberService.getMember(name).subscribe(
      data => { this.selectedMember = data, console.log(data.accounts) }
    );
  }

  getListOFAccounts(member: Member): Account[] {
    return member.accounts;
  }

  changeName() {
    let newName = this.editMemberForm.get("newName");
    console.log("In changeName() " + newName);
  }

}
