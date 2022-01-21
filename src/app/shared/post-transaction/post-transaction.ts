export class PostTransaction {
    constructor(
        public amount: number,
        public description: string,
        public subcategoryName: string,
        public memberName: string,
        public date: Date,
        public accountName: string
    ) { }
}
