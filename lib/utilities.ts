import {Objectable} from "./types.ts";

export function isObjectable(object: any): object is Objectable {
    return 'toObject' in object;
}
