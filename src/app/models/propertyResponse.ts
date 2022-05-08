import { OwnerResponse } from './ownerResponse';
import { PropertyTypeResponse } from './propertyTypeResponse';
import { PropertyImageResponse } from './propertyImageResponse';
import { ContractResponse } from './contractResponse';


export class PropertyResponse {
    constructor(public id : number,
        public neighborhood : string,
        public address : string,
        public price : number,
        public squareMeters : number,
        public rooms : number,
        public stratum : number,
        public hasParkingLot : boolean,
        public isAvailable : boolean,
        public remarks : string,
        public latitude : number,
        public longitude : number,
        public propertyType : PropertyTypeResponse ,
        public owner : OwnerResponse ,
        public propertyImages : PropertyImageResponse[] ,
        public contracts : ContractResponse[]) {
            this.id = id;
            this.neighborhood = neighborhood;
            this.address = address;
            this.price = price;
            this.squareMeters = squareMeters;
            this.rooms = rooms;
            this.stratum = stratum;
            this.hasParkingLot = hasParkingLot;
            this.isAvailable = isAvailable;
            this.remarks = remarks;
            this.latitude = latitude;
            this.longitude = longitude;
            this.propertyType = propertyType;
            this.owner = owner;
            this.propertyImages = propertyImages;
            this.contracts = contracts;
        }
}
