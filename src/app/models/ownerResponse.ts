import { UserResponse } from "./userResponse";
import { PropertyResponse } from './propertyResponse';
import { ContractResponse } from './contractResponse';

export class OwnerResponse {
    constructor(public id  : number,
        public contracts : ContractResponse[],
        public user : UserResponse,
        public properties : PropertyResponse, ) {
            this.id = id;
            this.user = user;
            this.properties = properties;
            this.contracts = contracts;
        }
}