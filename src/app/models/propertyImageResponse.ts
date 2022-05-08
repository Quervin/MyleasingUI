import { PropertyResponse } from './propertyResponse';

export class PropertyImageResponse {
    constructor(public id  : number,
        public imageUrl : string,
        public property : PropertyResponse[] ) {
            this.id = id;
            this.imageUrl = imageUrl;
            this.property = property;
        }
}