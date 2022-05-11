export class ResponseRequest {
    constructor(public isSuccess : boolean,
        public message : string,
        public total : number,
        public result :  any) {
            this.isSuccess = isSuccess;
            this.message = message;
            this.total = total;
            this.result = result;
        }
}