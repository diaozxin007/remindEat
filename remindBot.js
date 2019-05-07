const {Wechaty} = require('wechaty');
const schedule = require('./schedule');
const config = require('config');

const toAlais = config.get('toName');

const bot = new Wechaty();

function onScan (qrcode, status) {
    require('qrcode-terminal').generate(qrcode); // 在console端显示二维码
    const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcode),
    ].join('');
    console.log(qrcodeImageUrl)
}

// 登录
async function onLogin (user) {
    console.log(`贴心小助理${user}登录了`);

    //remindEat();

    //登陆后创建定时任务
    schedule.setSchedule('perday','0 0 12,19 * * *',()=>{
        console.log('你的贴心小助理开始工作啦！')
        remindEat();
    })
}

async function onMessage(msg){
    let from = msg.from();
    let text = msg.text();
    let room = msg.room();

    if(room){
        return;
    }

    if(from.self()){
        return;
    }

    let fromAlias = await from.alias();

    if(text === '我吃过了' && fromAlias === toAlais){

        schedule.cancelSchedule('fiveMins');
        sendGetMessage();

    }



}

async function sendGetMessage(){

    let contact = await bot.Contact.find({alias:toAlais});
    let text = '哦, 那我不提醒了';

    contact.say(text)

}


async function sendRemindText(){

    let contact = await bot.Contact.find({alias:toAlais});
    let message = getNotice();

    contact.say(message);

    console.log('假装我发了一条微信')

}

async function remindEat(){
    schedule.setSchedule('fiveMins','*/20 * * * * *',sendRemindText)
}

async function onLogOut(){

}


function getNotice(){

    let date = new Date();

    let dateStr = date.getHours() + ':' + date.getMinutes() + ':' + date.getMinutes();

    let notice = '不灵不罗 我是个机器人,现在是北京时间 ' + dateStr + '<br>我来提醒你吃饭了，如果已经吃了请回复我吃过了，否则每分钟提醒一次直到吃饭了为止';

    return notice;

}


bot.on('scan',    onScan);
bot.on('login',   onLogin);
// bot.on('logout',  onLogout);
bot.on('message', onMessage);

bot.start();


