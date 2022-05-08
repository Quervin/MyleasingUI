import { UserResponse } from "./userResponse";
import { PropertyResponse } from './propertyResponse';
import { ContractResponse } from './contractResponse';

export class OwnerResponse {
    constructor(public id  : number,
        public user : UserResponse,
        public properties : PropertyResponse,
        public contracts : ContractResponse[] ) {
            this.id = id;
            this.user = user;
            this.contracts = contracts;
        }
}