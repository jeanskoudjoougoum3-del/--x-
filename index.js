// ⚡ DARK-XD - POINT D'ENTRÉE

const { connectToWhatsApp } = require('./nexus/client');
const { loadPlugins } = require('./nexus/handler');
const config = require('./config');

async function start() {
    try {
        console.log(`🛫 Démarrage de ${config.botName}...`);
        
        // 1. Charger les plugins
        loadPlugins();

        // 2. Se connecter
        await connectToWhatsApp();

    } catch (e) {
        console.error("Erreur critique:", e);
    }
}

start();