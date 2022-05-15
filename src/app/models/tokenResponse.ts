export class TokenResponse {
    constructor(public token  : string,
        public isSuccess : boolean,
        public userId : string,
        public rolId : string,
        public expiration  : number) {
            this.token = token;
            this.isSuccess = isSuccess;
            this.rolId = rolId;
            this.userId = userId;
            this.expiration = expiration;
        }
}