
import { ContractResponse } from './contractResponse';
import { UserResponse } from './userResponse';

export class LesseeResponse {
    constructor(public id  : number,
        public user : UserResponse,
        public contracts : ContractResponse[] ) {
            this.id = id;
            this.user = user;
            this.contracts = contracts;
        }
}