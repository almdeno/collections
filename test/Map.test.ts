import {assertEquals} from '../deps.ts';
import {Mapp} from "../lib/Mapp.ts";

Deno.test("Mapp", async () => {
    const map = new Mapp<string, string>();
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

    assertEquals(map.get('test1'), 'a');
    assertEquals(map.get('testc'), undefined);

    assertEquals(map.delete('test1'), true);
    assertEquals(map.has('test1'), false);
    assertEquals(map.size, 3);
    assertEquals(map.get('test1'), undefined);

    map.forEach((value: string, key: string) => {
        assertEquals(['test2', 'test3', 'test4'].includes(key), true);
        assertEquals(['b', 'c', 'd'].includes(value), true);
    });

    for(const [key, value] of map) {
        assertEquals(['test2', 'test3', 'test4'].includes(key), true);
        assertEquals(['b', 'c', 'd'].includes(value), true);
    }

    map.clear();
    assertEquals(map.size, 0);
});
