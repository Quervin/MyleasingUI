export class UserResponse {
    constructor(public document : string,
        public firsName : string,
        public lastName : string,
        public address : string) {
            this.document = document;
            this.firsName = firsName;
            this.lastName = lastName;
            this.address = address;
        }
}