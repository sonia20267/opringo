const OPRINGO_URL = 'https://www.opringo.com/index';

async function launchOpringo() {

    console.log('[Opringo] Launcher started.');

    try {

        const connected = navigator.onLine;

        console.log('[Opringo] Online:', connected);

        // ---------------------------------------------------------
        // OFFLINE
        // ---------------------------------------------------------

        if (!connected) {

            console.log('[Opringo] Device is offline.');

            window.location.replace('./offline.html');

            return;
        }

        // ---------------------------------------------------------
        // ONLINE
        // ---------------------------------------------------------

        console.log('[Opringo] Device is online.');
        console.log('[Opringo] Opening Opringo inside app...');

        window.location.href = OPRINGO_URL;

    } catch (error) {

        console.error('[Opringo] Launch error:', error);

        window.location.replace('./offline.html');
    }
}

launchOpringo();