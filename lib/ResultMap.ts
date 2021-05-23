import {Mapp} from './Mapp.ts';
import {Result, Ok, Err, Exception} from '../deps.ts';
import {Objectable} from "./types.ts";

export const MapMissingKeyException = new Exception({
    id: 'MAP_MISSING_ELEMENT',
    internalMessageShort: 'Map Missing Key',
    internalMessageLong: `Map member get was called with key that doesn't not exist`,
    userMessageShort: 'Map Missing Key',
    userMessageLong: `Map member get was called with key that doesn't not exist`,
});

export class ResultMap<T, V> implements Objectable  {
    private map: Mapp<T, V> = new Mapp<T, V>();

    static get [Symbol.species]() { return ResultMap; }

    [Symbol.iterator]() {
        return this.map[Symbol.iterator]();
    }

    get size(): number {
        return this.map.size;
    }

    clear(): void {
        this.map.clear();
    }

    delete(key: T): boolean {
        return this.map.delete(key);
    }

    entries(): IterableIterator<[T, V]> {
        return this.map.entries();
    }

    get(key: T): Result<V> {
        const val = this.map.get(key);
        if(val) {
            return Ok<V>(val)
        } else {
            return Err(MapMissingKeyException, {
                key
            });
        }
    }

    has(key: T): boolean {
        return this.map.has(key);
    }

    keys(): IterableIterator<T> {
        return this.map.keys();
    }

    set(key: T, val: V): Map<T, V> {
        return this.map.set(key, val);
    }

    values(): IterableIterator<V> {
        return this.map.values();
    }

    forEach(fn: (value: V, key: T, map: Map<T, V>) => void): void {
        this.map.forEach(fn);
    }

    toObject(): {[key: string]: any} {
        return this.map.toObject();
    }
}
