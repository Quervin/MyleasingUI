import { PropertyResponse } from './propertyResponse';

export class PropertyTypeResponse {
    constructor(public id: number,
        public name: string,
        public properties : PropertyResponse[]) {
            this.id = id;
            this.name = name;
            this.properties = properties;
        }
}