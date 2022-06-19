export class AddContractRequest {
    constructor(public Id : number,
        public Price: number,
        public Remarks: string,
        public StartDate: string,
        public EndDate: string,
        public IsActive: boolean,
        public PropertyId: number,
        public LesseeId: number,
        public OwnerId: number,
        ) {
            this.Id = Id;
            this.Price = Price;
            this.Remarks = Remarks;
            this.StartDate = StartDate;
            this.EndDate = EndDate;
            this.IsActive = IsActive;
            this.PropertyId = PropertyId;
            this.LesseeId = LesseeId;
            this.OwnerId = OwnerId;
        }
}