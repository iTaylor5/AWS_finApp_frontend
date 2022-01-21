import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../accounts/account';
import { Member } from './member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseUrl = environment.baseUrl + "/members";

  constructor(private httpClient: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.httpClient.get<GetResponseMembersList>(this.baseUrl).pipe(
      map(response => response._embedded.members)
    )
  }

  getMember(name: string): Observable<Member> {
    return this.httpClient.get<Member>(this.baseUrl + '/getMemberByName?name=' + name);
  }
}

interface GetResponseMembersList {
  _embedded: {
    members: Member[];
  }
}