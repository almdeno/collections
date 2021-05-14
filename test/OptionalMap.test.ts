import {assertEquals} from '../deps.ts';
import {OptionalMap} from "../lib/OptionalMap.ts";
import {Optional} from '../deps.ts'

Deno.test("OptionalMap", async () => {
    const map = new OptionalMap<string, string>();
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

    const opt1: Optional<string> = map.get('test1');
    assertEquals(opt1.isEmpty(), false);
    assertEquals(opt1.isPresent(), true);
    let res = false;
    opt1.ifPresent(() => res = true);
    assertEquals(res, true);

    const opt2: Optional<string> = map.get('testc');
    assertEquals(opt2.isEmpty(), true);
    assertEquals(opt2.isPresent(), false);
    res = false;
    opt2.ifPresent(() => res = true);
    assertEquals(res, false);

    assertEquals(map.delete('test1'), true);
    assertEquals(map.has('test1'), false);
    assertEquals(map.size, 3);
    const opt3: Optional<string> = map.get('test1');
    assertEquals(opt3.isEmpty(), true);
    assertEquals(opt3.isPresent(), false);

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
