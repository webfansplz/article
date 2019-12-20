console.log(Buffer.from([1, 2, 3, 4, 5]));

console.log(Buffer.from(new ArrayBuffer(8)));

const buffer = Buffer.from("Hello world");

console.log(buffer.toString());

const base64Str = buffer.toString("base64");

const buf = Buffer.from(base64Str, "base64");

console.log(buf.toString("utf8"));
