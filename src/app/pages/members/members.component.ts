import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Member } from 'src/app/shared/member/member';
import { MemberService } from 'src/app/shared/member/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  refreshMembersList = new BehaviorSubject<boolean>(true);

  membersList: Observable<Member[]>;

  constructor(private memberService: MemberService,) { }

  ngOnInit(): void {
    this.membersList = this.refreshMembersList.pipe(switchMap(_ => this.getMembers()));
  }

  getMembers() {
    return this.memberService.getMembers();
  }

}
