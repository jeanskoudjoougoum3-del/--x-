// 💾 DATABASE HELPER (Extension Groupes)

const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

function initDb() {
    if (!fs.existsSync(config.database.settings)) {
        fs.outputJsonSync(config.database.settings, { 
            mode: 'public', 
            lang: 'fr',
            autostatusview: false,
            autostatusreact: false,
            autotyping: false,
            autorecord: false,
            sudo: [], // Liste des Super-Utilisateurs
            menuImages: [
                "https://i.postimg.cc/tTkqwyzs/d3f5d50d54d348c369555e072c1d111b.jpg"]
        });
    }
    if (!fs.existsSync(config.database.groups)) fs.outputJsonSync(config.database.groups, {});
}

// Récupérer la config d'un groupe (avec valeurs par défaut)
function getGroupSettings(groupId) {
    initDb();
    const groups = fs.readJsonSync(config.database.groups);
    return groups[groupId] || {
        antilink: true,
        antilinkAction: 'delete',
        antispam: false,
        antitransfert: false,
        antimedia: false,
        antitag: false,
        antipromote: true,
        antidemote: false,
        antibadword: false,
        badwords: [],
        autoreact: false, // Réaction auto
        welcome: true, // Message de bienvenue
        welcomeMessage: "Bienvenue @user dans @group !\n\nDescription :\n@desc"
    };
}

// Mettre à jour un groupe
function updateGroupSetting(groupId, key, value) {
    initDb();
    const groups = fs.readJsonSync(config.database.groups);
    
    if (!groups[groupId]) groups[groupId] = {};
    groups[groupId][key] = value;
    
    fs.writeJsonSync(config.database.groups, groups, { spaces: 2 });
    return groups[groupId];
}

// ... (Le reste est identique : getSettings, updateSetting)
function getSettings() { initDb(); return fs.readJsonSync(config.database.settings); }
function updateSetting(key, value) { 
    const data = getSettings(); data[key] = value; 
    fs.writeJsonSync(config.database.settings, data, { spaces: 2 }); 
    return data; 
}

module.exports = { getSettings, updateSetting, getGroupSettings, updateGroupSetting };