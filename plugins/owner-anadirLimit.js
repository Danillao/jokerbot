import MessageType from '@whiskeysockets/baileys';
const pajak = 0;
const handler = async (m, {conn, text}) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;
  if (!who) throw '*[❗𝐈𝐍𝐅𝐎❗] 𝙴𝚃𝙸𝚀𝚄𝙴𝚃𝙰 UM 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙲𝙾M @𝚝𝚊𝚐*';
  const txt = text.replace('@' + who.split`@`[0], '').trim();
  if (!txt) throw '*[❗𝐈𝐍𝐅𝐎❗] INSIRA A QUANTIDADE DE 𝙳𝙸𝙰𝙼𝙰𝙽𝚃𝙴𝚂 𝚀𝚄𝙴 𝙳𝙴𝚂𝙴J𝙰 ADQUIRIR*';
  if (isNaN(txt)) throw '*[❗𝐈𝐍𝐅𝐎❗] 𝚂𝙸𝙼𝙱𝙾𝙻𝙾 𝙽Ã𝙾 PERMITIDO, 𝚂𝙾MENTE 𝙽𝚄𝙼𝙴𝚁𝙾𝚂!*';
  const dmt = parseInt(txt);
  let limit = dmt;
  const pjk = Math.ceil(dmt * pajak);
  limit += pjk;
  if (limit < 1) throw '*[❗𝐈𝐍𝐅𝐎❗] O 𝙽𝚄𝙼𝙴𝚁𝙾 𝙼𝙸𝙽𝙸𝙼𝙾 𝙳𝙴 𝙳𝙸𝙰𝙼𝙰𝙽𝚃𝙴𝚂 𝙿𝙰𝚁𝙰 ADQUIRIR É 𝟷*';
  const users = global.db.data.users;
  users[who].limit += dmt;
  m.reply(`≡ *💎 ADQUIRIDO*
┌──────────────
▢ *𝚃𝚘𝚝𝚊𝚕:* ${dmt}
└──────────────`);
};
handler.command = ['añadirdiamantes', 'addd', 'dard', 'dardiamantes'];
handler.rowner = true;
export default handler;
