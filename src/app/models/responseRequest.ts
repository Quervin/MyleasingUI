export class ResponseRequest {
    constructor(public isSuccess : boolean,
        public message : string,
        public result :  any) {
            this.isSuccess = isSuccess;
            this.message = message;
            this.result = result;
        }
}