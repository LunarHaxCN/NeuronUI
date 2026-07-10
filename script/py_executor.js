/**
 * @author: WhiteWallTeam
 * @date: 2025.10.13
 * @description: Python executor
 */

function onCallModuleEvent(args) {
    const {fun, value} = args;

    if (fun === 'script_py_executor' ) {
        execPython(getResource('py') + '/file.py')
    }
}