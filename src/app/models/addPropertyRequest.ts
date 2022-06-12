export class AddPropertyRequest {
    constructor(public Id : number,
        public OwnerId : number,
        public PropertyTypeId : number,
        public Neighborhood: string,
        public Address: string,
        public Price: number,
        public SquareMeters: number,
        public Rooms: number,
        public Stratum: number,
        public Latitude: number,
        public Longitude: number,
        public HasParkingLot: boolean,
        public IsAvailable: boolean,
        public Remarks: string) {
            this.Id = Id;
            this.OwnerId = OwnerId;
            this.PropertyTypeId = PropertyTypeId;
            this.Neighborhood = Neighborhood;
            this.Address = Address;
            this.Price = Price;
            this.SquareMeters = SquareMeters;
            this.Rooms = Rooms;
            this.Stratum = Stratum;
            this.Latitude = Latitude;
            this.Longitude = Longitude;
            this.HasParkingLot = HasParkingLot;
            this.IsAvailable = IsAvailable;
            this.Remarks = Remarks;
        }
}