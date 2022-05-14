export class TokenResponse {
    constructor(public token  : string,
        public isSuccess : boolean,
        public expiration  : number) {
            this.token = token;
            this.expiration = expiration;
        }
}