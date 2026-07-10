/**
 * @author: WhiteWallTeam
 * @date: 2025.10.13
 * @description: 导入模块测试用例
 */

const module = require('mojangson.js');

console.log(module.parseMojangSON(`{name:"Steve", health:20b, position:[1.5f,2.0f,3.5f], inventory:{slot:5,item:"diamond"}}`));
