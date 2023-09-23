import ytdl from 'ytdl-core';
import fs from 'fs';

const handler = async (m, {conn, args, isPrems, isOwner, command}) => {
  const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
  };
  if (args.length === 0) {
    m.reply(`*[❗] INSIRA O COMANDO MAIS INSIRA UM LINK DO YOUTUBE*`);
    return;
  }
  try {
    const urlYt = args[0];
    if (!urlYt.startsWith('http')) {
      m.reply(`*[❗] 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 UM LINK 𝙲𝙾𝚁𝚁𝙴𝚃𝙾 𝙳O 𝚈𝙾𝚄𝚃𝚄𝙱𝙴*`);
      return;
    }
    const infoYt = await ytdl.getInfo(urlYt);
    const titleYt = infoYt.videoDetails.title;
    const randomName = getRandom('.mp4');
    const stream = ytdl(urlYt, {filter: (info) => info.itag == 22 || info.itag == 18}).pipe(fs.createWriteStream(`./tmp/${randomName}`));
    m.reply(global.wait);
    // console.log("Descargando ->", urlYt);
    await new Promise((resolve, reject) => {
      stream.on('error', reject);
      stream.on('finish', resolve);
    });
    const stats = fs.statSync(`./tmp/${randomName}`);
    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    // console.log("Tamaño del video: " + fileSizeInMegabytes);
    if (fileSizeInMegabytes <= 999) {
      if (command == 'ytshort') {
        conn.sendMessage( m.chat, {video: fs.readFileSync(`./tmp/${randomName}`), fileName: `${titleYt}.mp4`, mimetype: 'video/mp4'}, {quoted: m});
      } else {
        conn.sendMessage( m.chat, {document: fs.readFileSync(`./tmp/${randomName}`), fileName: `${titleYt}.mp4`, mimetype: 'video/mp4'}, {quoted: m});
      }
    } else {
      m.reply(`*[❗] O 𝙰𝚁QU𝙸𝚅𝙾 𝙴 𝚂𝚄𝙿𝙴𝚁𝙸𝙾𝚁 𝙰 𝟿𝟿𝟿 𝙼𝙱*`);
    }
    fs.unlinkSync(`./tmp/${randomName}`);
  } catch (e) {
    m.reply(e.toString());
  }
};
handler.help = ['ytd'];
handler.tags = ['downloader'];
handler.command = ['videodoc', 'documentvid', 'videodocumento', 'ytshort'];
handler.exp = 3;
export default handler;
