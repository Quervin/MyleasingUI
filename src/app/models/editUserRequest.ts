export class EditUserRequest {
    constructor(public Email : string,
        public Document : string,
        public FirstName : string,
        public LastName : string,
        public Address : string,
        public OldPassword : string,
        public Phone : string,
        public NewPassword : string) {
            this.Email = Email;
            this.Document = Document;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Address = Address;
            this.Phone = Phone;
            this.OldPassword = OldPassword;
            this.NewPassword = NewPassword;
        }
}