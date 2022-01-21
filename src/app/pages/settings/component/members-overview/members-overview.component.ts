import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/shared/member/member';
import { MemberService } from 'src/app/shared/member/member.service';

@Component({
  selector: 'app-members-overview',
  templateUrl: './members-overview.component.html',
  styleUrls: ['./members-overview.component.scss']
})
export class MembersOverviewComponent implements OnInit {

  membersList: Member[];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    this.memberService.getMembers().subscribe(
      data => { this.membersList = data, console.log(data) }
    );
  }

}
