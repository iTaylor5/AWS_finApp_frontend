import { Account } from "../accounts/account";
import { Member } from "../member/member";
import { Subcategory } from "../subcategory/subcategory";

export class Transaction {
    public id: number;
    public member: Member;
    public amount: number;
    public description: string;
    public subcategory: Subcategory;

    public dateCreated: Date;
    public account: Account;

    constructor(

    ) { }
}
