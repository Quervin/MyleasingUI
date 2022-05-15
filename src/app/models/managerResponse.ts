import { UserResponse } from './userResponse';

export class ManagerResponse {
    constructor(public id  : number,
        public user : UserResponse) {
            this.id = id;
            this.user = user;
        }
}