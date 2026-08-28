
const vm = require('vm');
const fs = require('fs');
const app = require('app');

try {
    const code = `
    "use strict";
    console.log('ByteCode loaded successfully');
    1+2+3
    `
    const bin = vm.createBytecode(code);

    const path = app.getResource('data');
    fs.write(`${path}/bytecode.cjs`, bin);

    const bytecode = fs.read(`${path}/bytecode.cjs`,'bin');
    const result = vm.loadBytecode(bytecode);
    console.log('ByteCode加载结果:', result);
} catch (e) {
    console.log('ByteCode创建或加载失败:', e)
}
try {
    const code = `
    "use strict";
    const Module = {
        name: 'Snapshot',
        version: '1.0.0',
        description: 'Snapshot created by Snapshot.md',
        author: 'Snapshot'
    }

    function main() {
        const app = require('app');

        const resourcePath = app.getResource('data');
        console.log('Snapshot Resource Path:', resourcePath);
    }
    `
    const bin = vm.createSnapshot(code, true);

    const path = app.getResource('data');
    fs.write(`${path}/snapshot.bin`, bin);

    const bytecode = fs.read(`${path}/snapshot.bin`,'bin')
    const result = vm.loadSnapshot(bytecode, true)
    console.log('Snapshot加载结果:', result)
} catch (e) {
    console.log('Snapshot创建或加载失败:', e.message)
}
