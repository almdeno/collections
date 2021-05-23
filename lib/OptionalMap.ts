import {Mapp} from './Mapp.ts';
import {Optional} from '../deps.ts';
import {Objectable} from "./types.ts";

export class OptionalMap<T, V> implements Objectable  {
    private map: Mapp<T, V> = new Mapp<T, V>();

    static get [Symbol.species]() { return OptionalMap; }

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

    get(key: T): Optional<V> {
        return new Optional(this.map.get(key));
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
