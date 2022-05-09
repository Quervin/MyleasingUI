import { OwnerResponse } from './ownerResponse';
import { LesseeResponse } from './lesseeResponse';
import { PropertyResponse } from './propertyResponse';

export class ContractResponse {
    constructor(public id  : number,
        public remarks : string,
        public price : number,
        public startDate : string,
        public endDate : string,
        public IsActive : boolean,
        public owner: OwnerResponse,
        public lessee : LesseeResponse,
        public property : PropertyResponse) {
            this.id = id;
            this.price = price;
            this.startDate = startDate;
            this.endDate = endDate;
            this.IsActive = IsActive;
            this.owner = owner;
            this.lessee = lessee;
            this.property = property;
        }
}
