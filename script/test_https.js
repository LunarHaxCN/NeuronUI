
const https = require('https');
try {
    https.get('https://www.baidu.com',{},(code,data,headers)=>{
        console.log('http get',code,data,headers)
    })
} catch (e) {
    console.log(e)
}
