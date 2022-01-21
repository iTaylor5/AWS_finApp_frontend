import { Member } from "../member/member";
import { Transaction } from "../transactions/transaction";

export class Account {
    id: number;
    constructor(
        public name: string,
        public currency: string,
        public balance: number,
        public member: Member,
        public transactions: Transaction[]
    ) { }
}
