export class AddUserRequest {
    constructor(public Id  : number,
        public Email : string,
        public Document : string,
        public FirstName : string,
        public LastName : string,
        public Address : string,
        public Phone : string,
        public Password : string,
        public RoleId : number) {
            this.Id = Id;
            this.Email = Email;
            this.Document = Document;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Address = Address;
            this.Phone = Phone;
            this.Password = Password;
            this.RoleId = RoleId;
        }
}