import {search, download} from 'aptoide-scraper';
const handler = async (m, {conn, usedPrefix: prefix, command, text}) => {
  if (!text) throw `*[❗] INSIRA O NOME DA APK QUE QUER BUSCAR.*`;
  try {
    const searchA = await search(text);
    const data5 = await download(searchA[0].id);
    const response = `📲 *Downloader de App's* 📲\n\n📌 *Nome:* ${data5.name}\n📦 *Package:* ${data5.package}\n🕒 *Última atualização:* ${data5.lastup}\n📥 *Tamanho:* ${data5.size}`;
    await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m});
    if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
      return await conn.sendMessage(m.chat, {text: '*[ ⛔ ] O arquivo é muito pesado e por isso não sera enviado.*'}, {quoted: m});
    }
    await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m});
  } catch {
    throw `*[❗] Error, não foi encontrado nenhum resultado.*`;
  }
};
handler.command = /^(apkmod|modapk|dapk2|aptoide|aptoidedl)$/i;
export default handler;
