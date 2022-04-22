import { Comic } from "./comic";

export class Character {
    id: string = "";
    name: string = "";
    image: string = "";
    description: string = "";
    comics: Array<Comic> = [];
    wiki: string = "";
    details: string  = "";
}