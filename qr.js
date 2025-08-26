const { makeid } = require('./gen-id');
const express = require('express');
const QRCode = require('qrcode');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    jidNormalizedUser
} = require("@whiskeysockets/baileys");
const axios = require('axios');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    
    async function GIFTED_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/' + id);
        try {
            var items = ["Safari"];
            function selectRandomItem(array) {
                var randomIndex = Math.floor(Math.random() * array.length);
                return array[randomIndex];
            }
            var randomItem = selectRandomItem(items);
            
            let sock = makeWASocket({
                auth: state,
                printQRInTerminal: false,
                logger: pino({
                    level: "silent"
                }),
                browser: Browsers.macOS("Desktop"),
            });
            
            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect,
                    qr
                } = s;
                if (qr) await res.end(await QRCode.toBuffer(qr));
                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    let rf = __dirname + `/temp/${id}/creds.json`;
                    
                    function generateRandomText() {
                        const prefix = "3EB";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        let randomText = prefix;
                        for (let i = prefix.length; i < 22; i++) {
                            const randomIndex = Math.floor(Math.random() * characters.length);
                            randomText += characters.charAt(randomIndex);
                        }
                        return randomText;
                    }
                    
                    const randomText = generateRandomText();
                    try {
                        const base64Session = Buffer.from(data.toString()).toString('base64');
                        let md = "SOFIA-XMD~" + base64Session;
                        let code = await sock.sendMessage(sock.user.id, { text: md });
                        
                        let cap = `
ðŸ” *ð™³ð™¾ ð™½ð™¾ðšƒ ï¿½ðš‚ð™·ð™°ðšð™´ ðšƒð™·ð™¸ðš‚ ð™²ð™¾ð™³ð™´ ðš†ð™¸ðšƒð™· ï¿½ð™½ðšˆð™¾ð™½ð™´!!*

Use this code to create your own *sá´Ò“Éªá´€-xá´á´…* WhatsApp User Bot. ðŸ¤–

ðŸ“‚ *WEBSITE:*  
ðŸ‘‰ https://xpro-botz-ofc.vercel.app/

ðŸ› ï¸ *To add your SESSION_ID:*  
1. Open the \`session.js\` file in the repo.  
2. Paste your session like this:  
\`\`\`js
module.exports = {
  SESSION_ID: 'PASTE_YOUR_SESSION_ID_HERE'
}
\`\`\`  
3. Save the file and run the bot. âœ…

âš ï¸ *NEVER SHARE YOUR SESSION ID WITH ANYONE!*
`;
                    await sock.sendMessage(sock.user.id, {
                        text: cap,
                        contextInfo: {
                            externalAdReply: {
                                title: "SOFIA XMD âœ…",
                                thumbnailUrl: "https://i.postimg.cc/Th8ckcks/20250826-121342.jpg",
                                sourceUrl: "https://whatsapp.com/channel/0029VbBRYQA6buMQ3kgJTs11",
                                mediaType: 2,
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                            },
                        },
                    }, { quoted: code });
                    } catch (e) {
                        let ddd = await sock.sendMessage(sock.user.id, { text: e.toString() });
                       let cap = `
ðŸ” *ð™³ð™¾ ð™½ð™¾ðšƒ ðš‚ð™·ð™°ðšð™´ ï¿½ðšƒð™·ð™¸ðš‚ ð™²ð™¾ð™³ð™´ ðš†ð™¸ðšƒð™· ð™°ð™½ðšˆð™¾ð™½ð™´!!*

Use this code to create your own *sá´Ò“Éªá´€-á´á´…* WhatsApp User Bot. ðŸ¤–

ðŸ“‚ *WEBSITE:*  
ðŸ‘‰ https://xpro-botz-ofc.vercel.app/

ðŸ› ï¸ *To add your SESSION_ID:*  
1. Open the \`session.js\` file in the repo.  
2. Paste your session like this:  
\`\`\`js
module.exports = {
  SESSION_ID: 'PASTE_YOUR_SESSION_ID_HERE'
}
\`\`\`  
3. Save the file and run the bot. âœ…

âš ï¸ *NEVER SHARE YOUR SESSION ID WITH ANYONE!*
`;
                    await sock.sendMessage(sock.user.id, {
                        text: cap,
                        contextInfo: {
                            externalAdReply: {
                                title: "SOFIA XMD âœ…",
                                thumbnailUrl: "https://i.postimg.cc/Th8ckcks/20250826-121342.jpg",
                                sourceUrl: "https://whatsapp.com/channel/0029VbBRYQA6buMQ3kgJTs11",
                                mediaType: 2,
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                            },
                        },
                    }, { quoted: ddd });
                    }
                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`ðŸ‘¤ ${sock.user.id} ð—–ð—¼ð—»ð—»ð—²ð—°ð˜ð—²ð—± âœ… ð—¥ð—²ð˜€ð˜ð—®ð—¿ð˜ð—¶ð—»ð—´ ð—½ð—¿ð—¼ð—°ð—²ð˜€ð˜€...`);
                    await delay(10);
                    process.exit();
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restarted", err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "â— Service Unavailable" });
            }
        }
    }
    await GIFTED_MD_PAIR_CODE();
});

setInterval(() => {
    console.log("â˜˜ï¸ ð—¥ð—²ð˜€ð˜ð—®ð—¿ð˜ð—¶ð—»ð—´ ð—½ð—¿ð—¼ð—°ð—²ð˜€ð˜€...");
    process.exit();
}, 180000);

module.exports = router;
@...");
    process.exit();
}, 180000);

module.exports = router;
