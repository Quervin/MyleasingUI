export class AppConfig {
    constructor(public inputStyle? : string,
        public dark?: boolean,
        public theme?: string,
        public ripple?: boolean) {
            this.inputStyle = inputStyle;
            this.dark = dark;
            this.ripple = ripple;
        }
}