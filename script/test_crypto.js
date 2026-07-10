// only ascii
function strToBuf(str) {
    const bytes = []

    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i)

        if (code < 0x80) {
            bytes.push(code)
        } else if (code < 0x800) {
            bytes.push(0xc0 | (code >> 6))
            bytes.push(0x80 | (code & 0x3f))
        } else {
            bytes.push(0xe0 | (code >> 12))
            bytes.push(0x80 | ((code >> 6) & 0x3f))
            bytes.push(0x80 | (code & 0x3f))
        }
    }

    return new Uint8Array(bytes).buffer
}

// only ascii
function bufToStr(buffer) {
    const bytes = new Uint8Array(buffer)
    let str = ""

    for (let i = 0; i < bytes.length; i++) {
        str += String.fromCharCode(bytes[i])
    }

    return str
}

function hex(buf) {
    return [...new Uint8Array(buf)]
        .map(x => x.toString(16).padStart(2, "0"))
        .join("")
}

function randBuf(len) {
    const a = new Uint8Array(len)
    for (let i = 0; i < len; i++) a[i] = Math.random() * 256
    return a.buffer
}

{
    console.log("=== AES-128-CBC test ===")

    const data = strToBuf("AES128 CBC example")
    const key = randBuf(16)
    const iv = randBuf(16)

    const encrypted = Crypto.encrypt({
        cipher: "aes-128-cbc",
        data,
        key,
        iv
    })

    const decrypted = Crypto.decrypt({
        cipher: "aes-128-cbc",
        data: encrypted,
        key,
        iv
    })

    console.log("plain:", bufToStr(decrypted))
}

{
    console.log("=== AES-256-CBC test ===")

    const data = strToBuf("AES256 CBC example")
    const key = randBuf(32)
    const iv = randBuf(16)

    const enc = Crypto.encrypt({
        cipher: "aes-256-cbc",
        data,
        key,
        iv
    })

    const dec = Crypto.decrypt({
        cipher: "aes-256-cbc",
        data: enc,
        key,
        iv
    })

    console.log(bufToStr(dec))
}

{
    console.log("=== error tests ===")

    try {
        Crypto.encrypt()
    } catch (e) {
        console.log("OK:", e.message)
    }

    try {
        Crypto.encrypt({cipher: "aes-128-cbc"})
    } catch (e) {
        console.log("OK:", e.message)
    }

    try {
        Crypto.encrypt({
            cipher: "not-exist",
            data: randBuf(8)
        })
    } catch (e) {
        console.log("OK:", e.message)
    }

    try {
        Crypto.digest("sha256", "not buffer")
    } catch (e) {
        console.log("OK:", e.message)
    }
}

{
    console.log("=== large data test ===")

    const data = randBuf(1024 * 1024) // 1MB
    const key = randBuf(32)
    const iv = randBuf(16)

    const enc = Crypto.encrypt({
        cipher: "aes-256-cbc",
        data,
        key,
        iv
    })

    const dec = Crypto.decrypt({
        cipher: "aes-256-cbc",
        data: enc,
        key,
        iv
    })

    console.log("same size:", dec.byteLength === data.byteLength)
}

{
    console.log("=== SHA256 known vector ===")

    const data = strToBuf("abc")

    const h = Crypto.digest("sha256", data)

    console.log(hex(h))
    // ba7816bf8f01cfea414140de5dae2223
    // b00361a396177a9cb410ff61f20015ad
}

{
    console.log("=== SHA1 ===")

    const data = strToBuf("abc")

    const h = Crypto.digest("sha1", data)

    console.log(hex(h))
    // a9993e364706816aba3e25717850c26c9cd0d89d
}

{
    console.log("=== MD5 ===")

    const data = strToBuf("abc")

    const h = Crypto.digest("md5", data)

    console.log(hex(h))
    // 900150983cd24fb0d6963f7d28e17f72
}

{
    console.log("=== empty input ===")

    const empty = new ArrayBuffer(0)

    const h = Crypto.digest("sha256", empty)

    console.log(hex(h))
    // e3b0c44298fc1c149afbf4c8996fb924...
}

{
    console.log("=== large input ===")

    const data = randBuf(1024 * 1024) // 1MB

    const h = Crypto.digest("sha256", data)

    console.log("length:", new Uint8Array(h).length)
    console.log(hex(h))
}

{
    console.log("=== repeatability ===")

    const data = strToBuf("repeat test")

    const h1 = Crypto.digest("sha256", data)
    const h2 = Crypto.digest("sha256", data)

    console.log(hex(h1) === hex(h2))
}

{
    console.log("=== digest sizes ===")

    const data = strToBuf("test")

    const algos = ["md5", "sha1", "sha224", "sha256", "sha384", "sha512"]

    for (let i = 0; i < algos.length; i++) {
        const h = Crypto.digest(algos[i], data)
        console.log(algos[i], new Uint8Array(h).length)
    }
}

{
    console.log("=== binary data ===")

    const a = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 255])
    const h = Crypto.digest("sha256", a.buffer)

    console.log(hex(h))
}

{
    console.log("=== invalid algorithm ===")

    try {
        Crypto.digest("not-exist", strToBuf("x"))
    } catch (e) {
        console.log("OK:", e.message)
    }
}

{
    console.log("=== concatenation check ===")

    const a = strToBuf("hello ")
    const b = strToBuf("world")

    const merged = new Uint8Array(a.byteLength + b.byteLength)
    merged.set(new Uint8Array(a), 0)
    merged.set(new Uint8Array(b), a.byteLength)

    const h = Crypto.digest("sha256", merged.buffer)

    console.log(hex(h))
}
