import { Network } from '@capacitor/network';

const OPRINGO_URL = 'https://www.opringo.com/index';

async function launchOpringo() {
    try {
        const network = await Network.getStatus();

        console.log('[Opringo] Network:', network);

        if (!network.connected) {
            console.log('[Opringo] Device is offline.');
            window.location.replace('offline.html');
            return;
        }

        console.log('[Opringo] Launching...');
        window.location.replace(OPRINGO_URL);

    } catch (error) {
        console.error('[Opringo] Launch error:', error);

        // If network detection itself fails,
        // give the user the offline page rather than getting stuck.
        window.location.replace('offline.html');
    }
}

launchOpringo();