const OPRINGO_URL = 'https://www.opringo.com/index';

async function launchOpringo() {

    try {

        const network = await Capacitor.Plugins.Network.getStatus();

        console.log('[Opringo] Network:', network);

        // ---------------------------------------------------------
        // OFFLINE
        // ---------------------------------------------------------

        if (!network.connected) {

            console.log('[Opringo] Device is offline.');

            window.location.href('./offline.html');

            return;
        }

        // ---------------------------------------------------------
        // ONLINE
        // ---------------------------------------------------------

        console.log('[Opringo] Device is online.');
        console.log('[Opringo] Launching Opringo...');

        window.location.href(OPRINGO_URL);

    } catch (error) {

        console.error(
            '[Opringo] Launch error:',
            error
        );

        window.location.href('./offline.html');
    }
}

launchOpringo();