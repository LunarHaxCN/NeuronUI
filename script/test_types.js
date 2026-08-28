console.log("hello");
console.log("hello", "world");
console.log(123);
console.log(123.456);
console.log(true);
console.log(false);
console.log(null);
console.log(undefined);
console.log(NaN);
console.log(Infinity);
console.log(-Infinity);

console.log("name:", "Steve");
console.log("age:", 18);
console.log("value:", 123, true, null, undefined);
console.log("test", 123, "abc", true, [1, 2, 3]);

console.log([]);
console.log([1]);
console.log([1, 2, 3]);
console.log(["a", "b", "c"]);
console.log([1, "abc", true, null, undefined]);
console.log([[1, 2], [3, 4]]);
console.log([1, [2, [3, [4]]]]);

console.log([1, , 3]);
console.log([, ,]);
console.log([1, , , 4]);
console.log(new Array(5));

console.log({});
console.log({ a: 1 });
console.log({ a: 1, b: 2 });
console.log({
    name: "Steve",
    age: 18,
    enabled: true
});

console.log({
    name: "Steve",
    info: {
        age: 18,
        country: "China"
    }
});

console.log({
    a: {
        b: {
            c: {
                d: 123
            }
        }
    }
});

console.log({
    name: "Steve",
    age: 18,
    items: [1, 2, 3],
    tags: ["a", "b", "c"],
    info: {
        enabled: true,
        value: 123
    }
});

console.log({
    normal: 1,
    $test: 2,
    _test: 3,
    "hello-world": 4,
    "hello world": 5,
    "123": 6
});

const obj = Object.create(null);
obj.a = 1;
obj.b = "test";

console.log(obj);

const obj2 = Object.create({
    inherited: 123
});

obj2.own = 456;

console.log(obj2);

console.log(function () {});
console.log(function test() {});
console.log(() => {});
console.log(Math.max);
console.log(console.log);

console.log(0n);
console.log(123n);
console.log(123456789012345678901234567890n);

console.log(Symbol());
console.log(Symbol("test"));
console.log(Symbol("hello"));

console.log(new Date());
console.log(new Date(0));
console.log(new Date("2026-01-01T00:00:00Z"));

console.log(/abc/);
console.log(/abc/g);
console.log(/hello world/gi);

console.log(new Error("something went wrong"));
console.log(new TypeError("invalid type"));
console.log(new RangeError("out of range"));

const error = new Error("test");
error.code = 123;
error.message2 = "hello";

console.log(error);

console.log(new Map());

console.log(new Map([
    ["a", 1],
    ["b", 2]
]));

console.log(new Set());

console.log(new Set([
    1,
    2,
    3
]));

console.log(new Set([
    "a",
    "b",
    "c"
]));

console.log(new Uint8Array());
console.log(new Uint8Array([1, 2, 3]));
console.log(new Int32Array([100, 200, 300]));
console.log(new Float32Array([1.1, 2.2, 3.3]));

const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);

view.setUint8(0, 10);
view.setUint8(1, 20);
view.setUint8(2, 30);
view.setUint8(3, 255);

console.log(view);

console.log(
    "TEST",
    123,
    true,
    null,
    undefined,
    [1, 2, "abc", true],
    {
        name: "Steve",
        age: 18,
        enabled: true,
        items: [1, 2, 3],
        info: {
            version: "1.0.0",
            debug: false
        }
    }
);
