import { Network } from '@capacitor/network';

const OPRINGO_URL = 'https://www.opringo.com/index';

async function launchOpringo() {
    try {

        // Check network
        const network = await Network.getStatus();

        console.log('[Opringo] Network:', network);

        // ---------------------------------------------------------
        // OFFLINE
        // ---------------------------------------------------------

        if (!network.connected) {

            console.log('[Opringo] Device is offline.');

            window.location.replace('offline.html');

            return;
        }

        // ---------------------------------------------------------
        // ONLINE
        // ---------------------------------------------------------

        console.log('[Opringo] Device is online.');
        console.log('[Opringo] Launching Opringo...');

        window.location.replace(OPRINGO_URL);

    } catch (error) {

        console.error(
            '[Opringo] Launch error:',
            error
        );

        // If network detection fails, show offline page
        window.location.replace('offline.html');
    }
}

launchOpringo();