import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import {mediafiredl} from '@bochilteam/scraper';

const handler = async (m, {conn, args, usedPrefix, command}) => {
  if (!args[0]) throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙸𝙽SIRA 𝚄M LINK 𝚅𝙰𝙻𝙸𝙳𝙾 𝙳O 𝙼𝙴𝙳𝙸𝙰𝙵𝙸𝚁𝙴, 𝙴X𝙴𝙼𝙿𝙻𝙾: ${usedPrefix + command} https://www.mediafire.com/file/r0lrc9ir5j3e2fs/DOOM_v13_UNCLONE*`;
  try {
    const resEX = await mediafiredl(args[0]);
    const captionES = `
*📓 NOME:* ${resEX.filename}
*📁 𝙿𝙴𝚂𝙾:* ${resEX.filesizeH}
*📄 𝚃𝙸𝙿𝙾:* ${resEX.ext}

*⏳ 𝙴𝚂𝙿𝙴𝚁𝙴 ENQUANTO 𝙴𝙽𝚅𝙸𝙾 𝚂E𝚄 𝙰𝚁QU𝙸𝚅𝙾. . . .* 
`.trim();
    m.reply(captionES);
    await conn.sendFile(m.chat, resEX.url, resEX.filename, '', m, null, {mimetype: resEX.ext, asDocument: true});
  } catch {
    try {
      const res = await mediafireDl(args[0]);
      const {name, size, date, mime, link} = res;
      const caption = `
*📓 NOME:* ${name}
*📁 𝙿𝙴𝚂𝙾:* ${size}
*📄 𝚃𝙸𝙿𝙾:* ${mime}

*⏳ 𝙴𝚂𝙿𝙴𝚁𝙴 ENQUANTO ENVIO 𝚂E𝚄 𝙰𝚁QU𝙸𝚅𝙾. . . .* 
`.trim();
      await m.reply(caption);
      await conn.sendFile(m.chat, link, name, '', m, null, {mimetype: mime, asDocument: true});
    } catch {
      await m.reply('*[❗𝐈𝐍𝐅𝐎❗] 𝙴𝚁𝚁𝙾𝚁, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 TENTE NOVAMENTE *\n\n*- ESCREVA UM LINK QUE SEJA 𝚂𝙸𝙼𝙸𝙻𝙰𝚁 𝙰:*\n*◉ https://www.mediafire.com/file/r0lrc9ir5j3e2fs/DOOM_v13_UNCLONE*');
    }
  }
};
handler.help = ['mediafire'].map((v) => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(mediafire|mediafiredl|dlmediafire)$/i;
export default handler;

async function mediafireDl(url) {
  const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/', '')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
  const $ = cheerio.load(res.data);
  const link = $('#downloadButton').attr('href');
  const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ', '').replaceAll('\n', '');
  const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
  const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ', '');
  let mime = '';
  const rese = await axios.head(link);
  mime = rese.headers['content-type'];
  return {name, size, date, mime, link};
}
