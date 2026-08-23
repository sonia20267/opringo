const OPRINGO_URL = 'https://www.opringo.com/index';

async function launchOpringo() {

    console.log('[Opringo] Launcher started.');

    try {

        const network =
            await Capacitor.Plugins.Network.getStatus();

        console.log('[Opringo] Network:', network);

        if (!network.connected) {

            console.log('[Opringo] Device is offline.');

            window.location.replace('./offline.html');

            return;
        }

        console.log('[Opringo] Device is online.');
        console.log('[Opringo] Opening Opringo...');

        window.location.href = OPRINGO_URL;

    } catch (error) {

        console.error('[Opringo] Launch error:', error);

        window.location.replace('./offline.html');
    }
}

launchOpringo();