export class TokenResponse {
    constructor(public token  : string,
        public expiration  : string) {
            this.token = token;
            this.expiration = expiration;
        }
}