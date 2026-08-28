/**
 * @author: WhiteWallTeam
 * @date: 2025.10.13
 * @description: Python executor
 */

const app = require('app');

function onCallModuleEvent(args) {
    const {fun, value} = args;

    if (fun === 'script_py_executor' ) {
        app.execPython(app.getResource('py') + '/file.py')
    }
}