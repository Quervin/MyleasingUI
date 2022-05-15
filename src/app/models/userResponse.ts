export class UserResponse {
    constructor(public id : string,
        public document : string,
        public firstName : string,
        public lastName : string,
        public fullName : string,
        public email : string,
        public phone : string,
        public address : string) {
            this.id = id;
            this.document = document;
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = fullName;
            this.email = email;
            this.phone = phone;
            this.address = address;
        }
}