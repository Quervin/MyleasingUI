import { UserResponse } from './userResponse';

export class ManegerResponse {
    constructor(public id  : number,
        public user : UserResponse) {
            this.id = id;
            this.user = user;
        }
}