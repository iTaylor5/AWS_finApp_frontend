import { Account } from "../accounts/account";
import { Transaction } from "../transactions/transaction";

export class Member {

    id: number;
    name: string;
    accounts: Account[];
    transactions: Transaction[];
    img: string;
}
