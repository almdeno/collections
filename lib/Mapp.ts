import {Objectable} from "./types.ts";
import {isObjectable} from "./utilities.ts";

export class Mapp<T, V> implements Objectable {
    private map: Map<T, V> = new Map<T, V>();

    static get [Symbol.species]() { return Mapp; }

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

    get(key: T): V | undefined {
        return this.map.get(key);
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
        const out: {[key: string]: any} = {};
        for(const [key, val] of this.map.entries()) {
            if(isObjectable(val)) {
                out[`${key}`] = val.toObject();
            } else {
                out[`${key}`] = val;
            }
        }
        return out;
    }
}
