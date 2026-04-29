// 📜 Plugin: MENU (Stylisé)
const fs = require('fs');
const path = require('path');
const config = require('../../config');
const { getSettings } = require('../../lib/database');
const { styleText, formatUptime } = require('../../lib/functions');
const { t } = require('../../lib/language');

const MENU_IMAGES = [
    "https://i.postimg.cc/tTkqwyzs/d3f5d50d54d348c369555e072c1d111b.jpg"]

module.exports = {
    name: 'menu',
    aliases: ['help', 'list'],
    category: 'misc',
    description: 'Affiche le menu stylisé',
    usage: '.menu',

    // FLAGS
    groupOnly: false,
    ownerOnly: false,
    adminOnly: false,
    newsletterShow: true, // Activation Newsletter (Enveloppe)
    // contextInfo: false, // Désactivé (Pas d'AdReply/Miniature riche)

    execute: async (client, message, args, msgOptions) => {
        // 0. Réaction
        await client.sendMessage(message.key.remoteJid, { react: { text: "🏎️", key: message.key } });

        const settings = getSettings();
        const prefix = settings.prefix || config.prefix;
        const botName = settings.botName || config.botName; // Botname NON stylisé
        const lang = settings.lang || config.defaultLang;
        const username = message.pushName || "Utilisateur";

        // 1. Choix image (depuis DB)
        const images = settings.menuImages && settings.menuImages.length > 0 
            ? settings.menuImages 
            : MENU_IMAGES; // Fallback
        const randomImage = images[Math.floor(Math.random() * images.length)];

        const pluginsDir = path.join(__dirname, '../../plugins');
        const categories = fs.readdirSync(pluginsDir);
        
const { t } = require('../../lib/language');

// ... (code intermédiaire identique)

        const greeting = lang === 'fr' ? t('menu.greet_fr') : t('menu.greet_en');

        // Construction du menu avec styleText() appliqué aux corps
        let caption = `‎☄ ${botName} ☄\n`
            + `‎╭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭✶\n`
            + `‎┃${styleText(greeting)} ${username}\n`
            + `‎╰▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭✶\n‎\n`
            + `‎▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭✶\n`
            + `‎► ${styleText(t('menu.uptime'))} : ${formatUptime(process.uptime())}\n`
            + `‎► ${styleText(t('menu.prefix'))} : ${prefix}\n`
            + `‎▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭✶\n‎`;

        categories.forEach(category => {
            const catPath = path.join(pluginsDir, category);
            if (fs.lstatSync(catPath).isDirectory()) {
                const files = fs.readdirSync(catPath).filter(file => file.endsWith('.js'));
                
                if (files.length > 0) {
                    caption += `\n‎╭▭✶ ${styleText(category)}\n`;
                    files.forEach(file => {
                        const pluginModule = require(path.join(catPath, file));
                        // Supporte export unique OU tableau
                        const commands = Array.isArray(pluginModule) ? pluginModule : [pluginModule];

                        commands.forEach(plugin => {
                            if (plugin.name) {
                                caption += `‎► ${styleText(plugin.name)}\n`;
                            }
                        });
                    });
                    caption += `‎╰▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭╯\n`;
                }
            }
        });

        await client.sendMessage(message.key.remoteJid, {
            image: { url: randomImage },
            caption: caption,
            ...msgOptions // Injecte contextInfo (newsletter uniquement)
        }, { quoted: null }); // Pas de citation
    }
};