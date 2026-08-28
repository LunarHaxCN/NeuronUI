/**
 * @author: WhiteWallTeam
 * @date: 2024.10.15
 * @description: RPC 模块
 */

const rpc = require('lib_rpc.js');
const mojangson = require('mojangson.js');

const sendIdMap = new Map();
const receiveIdMap = new Map();

const sendNameToIdMap = new Map();
const receiveNameToIdMap = new Map();

const callbacks = new Map();

const rpcTasks = [];

/**
 * 处理 RPC 数据
 * @param {'send'|'receive'} type - 数据类型
 * @param {string} json - RPC 原始 JSON 字符串
 * @param {Map<number, string>} idMap - 对应的 ID 映射表
 * @param {Map<string, number>} nameMap - 对应的名称映射表
 */
function handleRpcEvent(type, json, idMap, nameMap) {
    const direction = type === 'send' ? '发送' : '接收';
    const node = rpc.fromTypedJson(JSON.parse(json));

    console.log(`${direction}RPC数据`, node);

    if (!Array.isArray(node) || node.length !== 3 || !Array.isArray(node[1])) return;

    const [flag, args] = node;
    const [id, payload] = args;

    switch (flag) {
        case 'r': // 请求注册
            idMap.set(id, payload);
            nameMap.set(payload, id);
            break;

        case 'c': { // 请求内容
            const name = idMap.get(id);
            if (name) {
                console.log(`${direction}${type === 'send' ? '客户端请求' : '服务器响应'} ${name}`, payload);
                if (type === 'receive' && callbacks.has(name)) {
                    const callback = callbacks.get(name);
                    callback(payload);
                }
            } else {
                console.error(`${direction}未知请求 ID: ${id}`);
            }
            break;
        }

        case 'ModEventC2S': {
            const [mod, component, func, data] = args;
            console.log(`${direction}ModEventC2S ${mod} ${component} ${func} ${data}`);
            break;
        }

        case 'e': // 事件结束
            console.log('RPC事件结束');
            break;
    }
}

function onPyRpcSendEvent(id, hex, json) {
    handleRpcEvent('send', json, sendIdMap, sendNameToIdMap);
}

function onPyRpcReceiveEvent(id, hex, json) {
    handleRpcEvent('receive', json, receiveIdMap, receiveNameToIdMap);
}

function onTickEvent() {
    if (rpcTasks.length === 0) return;
    for (const task of rpcTasks) {
        sendRpc(98247598, task);
    }
    rpcTasks.length = 0;
}

/**
 *
 * @param name {string}
 * @param data {any}
 */
function sendFunctionCall(name, data) {
    if (!sendNameToIdMap.has(name)) {
        // 随机生成id
        let id = Math.floor(Math.random() * 1000) + 100;
        while (sendIdMap.has(id)) {
            // 重复的id，重新生成
            id = Math.floor(Math.random() * 1000) + 100;
        }
        const json = rpc.toTypedJson(['r', [id, name], null]);
        rpcTasks.push(JSON.stringify(json));
        setTimeout(() => {
            sendFunctionCall(name, data);
        }, 500);
    } else {
        const id = sendNameToIdMap.get(name);
        const json = rpc.toTypedJson(['c', [id, data], null]);
        rpcTasks.push(JSON.stringify(json));
    }
}

function onCallModuleEvent(args) {
    const {fun, key} = args;

    if (fun === 'script_pet_bag' && isInGame()) {
        if (key === 'openPetBag') {
            sendFunctionCall(
                'Minecraft:pet:open_pet_bag',
                {playerId: getLocalPlayerUniqueID(), isNewRequest: true}
            );
            callbacks.set('Minecraft:pet:open_pet_bag', (result) => {
                if ('1' in result && '2' in result) {
                    callbacks.delete('Minecraft:pet:open_pet_bag');

                    let slot = 0;
                    for (const item of result['1']) {
                        if (item) {
                            //{
                            //    "count": 64,
                            //    "newItemName": "minecraft:oak_planks",
                            //    "isDiggerItem": false,
                            //    "enchantData": [],
                            //    "durability": 0,
                            //    "itemId": 5,
                            //    "customTips": "",
                            //    "extraId": "",
                            //    "newAuxValue": 0,
                            //    "modEnchantData": [],
                            //    "modId": "",
                            //    "userData": null,
                            //    "modItemId": "",
                            //    "itemName": "minecraft:planks",
                            //    "auxValue": 0,
                            //    "showInHand": true
                            //}
                            const {itemName, count} = item;
                            console.log(`背包第${slot}格物品：${itemName} x ${count}`);
                        }
                        slot++;
                    }
                    Object.entries(result['2']).forEach(([key, value]) => {
                        //{"itemBtn1": {
                        //    "count": 1,
                        //    "newItemName": "minecraft:diamond_sword",
                        //    "isDiggerItem": false,
                        //    "enchantData": [],
                        //    "durability": 1561,
                        //    "itemId": 276,
                        //    "customTips": "",
                        //    "extraId": "",
                        //    "newAuxValue": 0,
                        //    "modEnchantData": [],
                        //    "modId": "",
                        //    "userData": null,
                        //    "modItemId": "",
                        //    "itemName": "minecraft:diamond_sword",
                        //    "auxValue": 0,
                        //    "showInHand": true
                        //}}
                        const {itemName, count} = value;
                        console.log(`背包${key}格物品：${itemName} x ${count}`);
                    });
                }
            });
        } else if (key === 'closePetBag') {
            sendFunctionCall(
                'Minecraft:pet:close_pet_bag',
                {playerId: getLocalPlayerUniqueID(), isNewRequest: true}
            );
        } else if (key === 'copyPetBagItem') {
            sendFunctionCall(
                'Minecraft:pet:open_pet_bag',
                {playerId: getLocalPlayerUniqueID(), isNewRequest: true}
            );
            callbacks.set('Minecraft:pet:open_pet_bag', (result) => {
                if ('1' in result && '2' in result) {
                    callbacks.delete('Minecraft:pet:open_pet_bag');

                    let slot = 0;
                    for (const item of result['1']) {
                        if (item) {
                            const {itemName, count} = item;
                            console.log(`背包第${slot}格物品：${itemName} x ${count}`);
                        }
                        slot++;
                    }
                    Object.entries(result['2']).forEach(([key, value]) => {
                        const {itemName, count} = value;
                        console.log(`宠物背包${key}格物品：${itemName} x ${count}`);

                        if (count > 0x7fffffff / 2) {
                            return;
                        }

                        sendFunctionCall(
                            'Minecraft:pet:swap_pet_bag_item',
                            {
                                playerId: getLocalPlayerUniqueID(),
                                takePercent: 6.666,
                                fromSlot: key,
                                toSlot: key,
                                fromItem: value,
                                toItem: null,
                                isNewRequest: true
                            }
                        );
                    });
                }
            });
        } else if (key === 'movePetBagItem') {
            sendFunctionCall(
                'Minecraft:pet:open_pet_bag',
                {playerId: getLocalPlayerUniqueID(), isNewRequest: true}
            );
            callbacks.set('Minecraft:pet:open_pet_bag', (result) => {
                if ('1' in result && '2' in result) {
                    callbacks.delete('Minecraft:pet:open_pet_bag');

                    const items = new Map();

                    let slot = 0;
                    for (const item of result['1']) {
                        if (item) {
                            items.set(slot, item);
                        }
                        slot++;
                    }

                    Object.entries(result['2']).forEach(([key, value]) => {
                        const {itemName, count} = value;
                        console.log(`宠物背包${key}格物品：${itemName} x ${count}`);

                        if (count <= 64) {
                            return;
                        }

                        for (let i = 0; i < slot; i++) {
                            if (items.has(i)) {
                                continue;
                            }
                            sendFunctionCall(
                                'Minecraft:pet:swap_pet_bag_item',
                                {
                                    playerId: getLocalPlayerUniqueID(),
                                    takePercent: 64 / count,
                                    fromSlot: key,
                                    toSlot: i,
                                    fromItem: value,
                                    toItem: null,
                                    isNewRequest: true
                                }
                            );
                            items.set(i, value);
                            break;
                        }
                    });
                }
            });
        } else if (key === 'dropPetBagItem') {
            sendFunctionCall(
                'Minecraft:pet:open_pet_bag',
                {playerId: getLocalPlayerUniqueID(), isNewRequest: true}
            );
            callbacks.set('Minecraft:pet:open_pet_bag', (result) => {
                if ('1' in result && '2' in result) {
                    callbacks.delete('Minecraft:pet:open_pet_bag');

                    Object.entries(result['2']).forEach(([key, value]) => {
                        const {itemName, count} = value;
                        console.log(`宠物背包${key}格物品：${itemName} x ${count}`);

                        sendFunctionCall(
                            'Minecraft:pet:drop_pet_bag_item',
                            {
                                playerId: getLocalPlayerUniqueID(),
                                slot: key,
                                item: value,
                                isNewRequest: true
                            }
                        );
                    });
                }
            });
        }
    }
}

function onLeaveGameEvent() {
    sendIdMap.clear();
    receiveIdMap.clear();
    sendNameToIdMap.clear();
    receiveNameToIdMap.clear();
    callbacks.clear();
    rpcTasks.length = 0;
}