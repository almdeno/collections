import {assertEquals} from '../deps.ts';
import {ResultMap} from '../lib/ResultMap.ts';
import {Result, isOk, isErr, ifOk} from '../deps.ts'
import {OptionalMap} from "../lib/OptionalMap.ts";
import {Mapp} from "../lib/Mapp.ts";

Deno.test("ResultMap", async () => {
    const map = new ResultMap<string, string>();
    map.set('test1', 'a');
    map.set('test2', 'b');
    assertEquals(map.size, 2);

    map.set('test3', 'c');
    map.set('test4', 'd');
    assertEquals(map.size, 4);

    assertEquals(map.has('test1'), true);
    assertEquals(map.has('testc'), false);

    assertEquals(Array.from(map.keys()).length, 4);
    assertEquals(Array.from(map.keys()), ['test1', 'test2', 'test3', 'test4']);

    assertEquals(Array.from(map.values()).length, 4);
    assertEquals(Array.from(map.values()), ['a', 'b', 'c', 'd']);

    assertEquals(Array.from(map.entries()).length, 4);
    assertEquals(Array.from(map.entries()), [['test1', 'a'], ['test2', 'b'], ['test3', 'c'], ['test4', 'd']]);

    const opt1: Result<string> = map.get('test1');
    assertEquals(isOk(opt1), true);
    assertEquals(isErr(opt1), false);
    let res = false;
    ifOk(opt1, () => res = true);
    assertEquals(res, true);
    let res2 = 'b';
    ifOk(opt1, (val: string) => res2 = val);
    assertEquals(res2, 'a');

    const opt2: Result<string> = map.get('testc');
    assertEquals(isOk(opt2), false);
    assertEquals(isErr(opt2), true);
    res = false;
    ifOk(opt2, () => res = true);
    assertEquals(res, false);

    assertEquals(map.delete('test1'), true);
    assertEquals(map.has('test1'), false);
    assertEquals(map.size, 3);

    const opt3: Result<string> = map.get('test1');
    assertEquals(isOk(opt3), false);
    assertEquals(isErr(opt3), true);
    res = false;
    ifOk(opt2, () => res = true);
    assertEquals(res, false);

    map.forEach((value: string, key: string) => {
        assertEquals(['test2', 'test3', 'test4'].includes(key), true);
        assertEquals(['b', 'c', 'd'].includes(value), true);
    });

    for(const [key, value] of map) {
        assertEquals(['test2', 'test3', 'test4'].includes(key), true);
        assertEquals(['b', 'c', 'd'].includes(value), true);
    }

    assertEquals(map.toObject(), {
        'test2': 'b',
        'test3': 'c',
        'test4': 'd',
    });

    map.clear();
    assertEquals(map.size, 0);
});

Deno.test("Mapp of Maps", async () => {
    const map = new ResultMap<string, ResultMap<string, string>>();

    const mapA = new ResultMap<string, string>();
    mapA.set('test1', 'a');
    mapA.set('test2', 'b');

    const mapB = new ResultMap<string, string>();
    mapB.set('test3', 'c');
    mapB.set('test4', 'd');

    map.set('a', mapA);
    map.set('b', mapB);

    assertEquals(map.toObject(), {
        'a': {
            'test1': 'a',
            'test2': 'b'
        },
        'b': {
            'test3': 'c',
            'test4': 'd'
        },
    });
});
