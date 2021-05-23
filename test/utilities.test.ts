import {assertEquals} from '../deps.ts';
import {isObjectable} from "../lib/utilities.ts";
import {Mapp} from "../lib/Mapp.ts";
import {ResultMap} from "../lib/ResultMap.ts";
import {OptionalMap} from "../lib/OptionalMap.ts";

Deno.test("isObjectable", async () => {
    assertEquals(isObjectable('a'), false);
    assertEquals(isObjectable(1), false);
    assertEquals(isObjectable({}), false);
    assertEquals(isObjectable([]), false);

    assertEquals(isObjectable(new Mapp()), true);
    assertEquals(isObjectable(new ResultMap()), true);
    assertEquals(isObjectable(new OptionalMap()), true);
});
