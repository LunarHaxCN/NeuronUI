/**
 * @author: WhiteWallTeam
 * @date: 2024.10.12
 * @description: 基本脚本
 */

function onSAuthLoginRequestEvent(body) {
    console.log(`Request ${body}`)
}

function onSAuthLoginResponseEvent(body) {
    console.log(`Response ${body}`)
}

function onSAuthJsonHookEvent(json) {
    console.log(`SAuthJson ${json}`)
    tryInitUser()
}

function onCallModuleEvent(args) {
    // console.log('CallModule',args)
}

function decodePartialUnicode(str) {
    return str.replace(/\\u([0-9A-Fa-f]{4})/g, (match, grp) => {
        return String.fromCharCode(parseInt(grp, 16));
    });
}

const https = require('https');
const netease = require('netease');

// Fetch data from a given URL with retry logic
async function fetchData(url, body = '', retries = 3, delay = 1000) {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const data = await new Promise((resolve, reject) => {
                const loginToken = netease.getLoginToken();
                const uid = netease.getLoginUid();
                const token = netease.encryptToken(loginToken, url, body);
                if (loginToken === '') {
                    reject(new Error('loginToken empty'));
                    return;
                }
                console.log(`Requesting game API: ${url}`);
                https.post(url, {'user-token': token, 'user-id': uid}, body, (code, responseData, headers) => {
                    if (code === 200) {
                        resolve(decodePartialUnicode(responseData));
                    } else {
                        reject(new Error(`API call failed. Code: ${code}`));
                    }
                });
            });

            // Parse JSON and check for errors
            const jsonData = JSON.parse(data);
            if (jsonData.code !== 0) {
                throw new Error(`API error. Code: ${jsonData.code}, Message: ${jsonData.message} ${jsonData.data}`);
            }
            return jsonData;
        } catch (error) {
            if (attempt < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay)); // wait before retrying
            } else {
                throw error; // rethrow the error if no retries left
            }
        }
    }
}

// Main function to initialize user and handle API calls
async function tryInitUser() {
    try {
        // Fetch user data
        const userDataJson = await fetchData('https://g79obtcore.minecraft.cn:8443/pe-user-detail/get', '', 10);
        console.log(`User data: ${JSON.stringify(userDataJson.entity)}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}
